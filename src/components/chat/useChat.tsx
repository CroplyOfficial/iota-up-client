import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "messages";
const SOCKET_SERVER_URL = "http://localhost:5000";

const useChat = ({ token, chatId }: { token: string; chatId: string }) => {
  const [chat, setChat] = useState([]);
  const socketRef: any = useRef();

  useEffect(() => {
    if (socketRef) {
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: { chatId },
      });

      socketRef.current.emit("getChat", { token, chatId });

      socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (chat: any) => {
        setChat(chat);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [chatId]);

  const sendMessage = (content: string) => {
    socketRef.current.emit("newMessage", {
      content,
      chatId: chatId,
      token,
    });
  };

  return { chat, sendMessage };
};

export default useChat;
