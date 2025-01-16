import { useCallback, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

const useInfiniteScroll = ({ fetchUrl }) => {
  const access = useSelector((state) => state.login.access);
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);
  const observerRef = useRef();
  const [messages, setMessages] = useState(false);
  const fetchItems = useCallback(
    async (cursorParam) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const headers = access ? { Authorization: `Bearer ${access}` } : {};

        const params = new URLSearchParams({
          ...(cursorParam && { cursor: cursorParam }),
        });

        const response = await axios.get(`${fetchUrl}&${params}`, {
          headers,
        });

        if (response.data.cursor === null) setHasMore(false);
        setCursor(response.data.cursor);
        setIsInitialized(true);

        if (response.data.messages) {
          setMessages(true);
          setItems((prevItems) => [...response.data.messages, ...prevItems]);
          return response.data.messages || [];
        } else {
          return (
            response.data.posts ||
            response.data.products ||
            response.data.comments ||
            response.data.messages ||
            []
          );
        }
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          hasFetched.current = false;
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            return await fetchItems(cursorParam);
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else if (
          error.response.data.message === '검색어가 입력되지 않았습니다.'
        ) {
          return [];
        } else if (
          error.response.data.message === '더 이상 불러올 메시지가 없습니다.'
        ) {
          setHasMore(false);
          hasFetched.current = true;
          return [];
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [access, fetchUrl, refreshAccessToken, isLoading]
  );
  const refresh = useCallback(async () => {
    hasFetched.current = false;
    setItems([]);
    setCursor(null);
    setHasMore(true);
    const newItems = await fetchItems('');
    setItems(newItems);
  }, [fetchItems]);

  useEffect(() => {
    hasFetched.current = false;
    setItems([]);
    setCursor(null);
    setHasMore(true);
  }, [fetchUrl]);

  useEffect(() => {
    const loadItems = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      const newItems = await fetchItems('');
      setItems(newItems);
    };
    loadItems();
  }, [fetchUrl, fetchItems]);

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const loadItems = async () => {
            const newItems = await fetchItems(cursor);
            if (messages) {
              setItems((prevItems) => [...newItems, ...prevItems]);
            } else {
              setItems((prevItems) => [...prevItems, ...newItems]);
            }
          };
          loadItems();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [cursor, isLoading, fetchItems, hasMore, messages]
  );

  return {
    items,
    isInitialized,
    lastItemRef,
    refresh,
    hasMore,
    isLoading,
  };
};

export default useInfiniteScroll;
