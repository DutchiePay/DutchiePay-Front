import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const useWebSocket = (access) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!access) return;

    const socket = new SockJS(`${process.env.NEXT_PUBLIC_BASE_URL}/chat`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${access}`,
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        setIsConnected(true);
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error: ', error);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
      setClient(null);
      setIsConnected(false);
    };
  }, [access]);

  return { client, isConnected };
};

export default useWebSocket;
