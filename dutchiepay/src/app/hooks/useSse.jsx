import { useEffect, useRef } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useSelector } from 'react-redux';

const useSse = (url, accessToken, onMessage) => {
  const eventSourceRef = useRef(null);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    if (eventSourceRef.current) return;

    const source = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    source.onerror = () => {
      source.close();
      eventSourceRef.current = null;
    };

    eventSourceRef.current = source;

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [url, accessToken, onMessage]);
};

export default useSse;
