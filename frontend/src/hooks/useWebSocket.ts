import { useEffect, useState } from 'react';

export interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

export const useWebSocket = (url?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = url || ((import.meta as any).env.VITE_WS_URL as string | undefined) || 'ws://localhost:3001';


    
    try {
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setLastMessage(message);
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e);
        }
      };

      socket.onerror = (event) => {
        setError('WebSocket error occurred');
        console.error('WebSocket error:', event);
      };

      socket.onclose = () => {
        setIsConnected(false);
      };

      setWs(socket);

      return () => {
        socket.close();
      };
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to connect to WebSocket');
    }
  }, [url]);

  const send = (message: WebSocketMessage) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };

  return {
    isConnected,
    lastMessage,
    error,
    send,
  };
};
