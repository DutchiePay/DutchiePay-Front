import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

const useInfiniteScroll = (
  fetchUrl,
  categoryParam,
  filter,
  endParam = null
) => {
  const access = useSelector((state) => state.login.access);
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);
  const observerRef = useRef();

  const fetchItems = useCallback(
    async (cursorParam) => {
      setIsLoading(true);
      try {
        const headers = {};
        if (access) {
          headers.Authorization = `Bearer ${access}`;
        }

        const response = await axios.get(
          `${fetchUrl}?${filter ? `filter=${filter}` : ''}&${categoryParam}${endParam ? `&end=${endParam}` : ''}&cursor=${cursorParam}&limit=16`,
          { headers }
        );

        if (response.data.cursor === null) setHasMore(false);
        setCursor(response.data.cursor);
        setIsInitialized(true);
        return response.data.posts || response.data.products || [];
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
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [access, endParam, fetchUrl, filter, refreshAccessToken, categoryParam]
  );

  useEffect(() => {
    hasFetched.current = false;
    setItems([]);
    setCursor(null);
    setHasMore(true);
  }, [filter, categoryParam, endParam]);

  useEffect(() => {
    const loadItems = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      const newItems = await fetchItems('');
      setItems(newItems);
    };
    loadItems();
  }, [filter, categoryParam, endParam, fetchItems]);

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const loadItems = async () => {
            const newItems = await fetchItems(cursor);
            setItems((prevItems) => [...prevItems, ...newItems]);
          };
          loadItems();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [cursor, isLoading, fetchItems, hasMore]
  );

  return { items, isInitialized, lastItemRef, hasMore, isLoading };
};

export default useInfiniteScroll;
