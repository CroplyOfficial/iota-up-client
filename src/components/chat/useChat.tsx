import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CHAT_URL } from "../../config";

const useChat = ({ token, chatId }: { token: string; chatId: string }) => {
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [canUnblock, setCanUnblock] = useState<boolean>(false);
  const socketRef: any = useRef();

  const userLoginMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userLoginMeta;

  const deleteMessageContent = "this message was deleted";

  useEffect(() => {
    if (socketRef) {
      socketRef.current = socketIOClient(CHAT_URL, {
        query: { chatId },
      });

      socketRef.current.emit("getChat", { token, chatId });

      socketRef.current.on("chats", (chat: any) => {
        setIsBlocked(chat.isBlocked);
        setCanUnblock(userInfo?._id == chat.blockedBy);
        setChat(chat);
        setMessages(chat?.messages);
      });

      socketRef.current.on("messages", (messages: any) => {
        setMessages(messages);
      });

      socketRef.current.on("block", (chat: any) => {
        console.log(chat.isBlocked, chat.canUnBlock, chat);
        setIsBlocked(chat.isBlocked);
        setCanUnblock(userInfo?._id == chat.blockedBy);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [chatId]);

  const sendMessage = (content: string) => {
    socketRef.current.emit("newMessage", {
      content,
      chatId,
      token,
    });
  };

  const editMessage = (msgId: string, content: string) => {
    socketRef.current.emit("editMessage", {
      content,
      chatId,
      token,
      msgId,
    });
  };

  const toggleBlock = () => {
    socketRef.current.emit("toggleBlock", {
      token,
      chatId,
    });
  };

  const deleteChat = () => {
    socketRef.current.emit("delete", {
      token,
      chatId,
    });
  };

  const deleteMessage = (msgId: string) => {
    socketRef.current.emit("editMessage", {
      content: deleteMessageContent,
      chatId,
      token,
      msgId,
    });
  };

  return {
    chat,
    messages,
    isBlocked,
    canUnblock,
    sendMessage,
    toggleBlock,
    deleteChat,
    editMessage,
    deleteMessage,
  };
};

export default useChat;
