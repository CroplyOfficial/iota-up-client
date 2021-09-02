import { useEffect, useState } from "react";
import { MessageList } from "react-chat-elements-typescript";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { chatById } from "../../actions/chatActions";
import axios from "axios";
import "./messages.css";
import { io } from "socket.io-client";
import { BARE_API } from "../../config";
import useChat from "./useChat";

interface IProps {
  id: string;
}
const MessageChatList = (props: IProps) => {
  const { id } = props;
  const dispatch = useDispatch();

  const [msg, setMsg] = useState<string>();

  const userMeta: any = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userMeta;

  const {
    chat,
    sendMessage,
  }: { chat: any; sendMessage: (message: string) => any } = useChat({
    chatId: id,
    token: userInfo.token,
  });

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (msg) {
      sendMessage(msg);
      setMsg("");
    }
  };

  return (
    <div>
      {id ? (
        <>
          <div className="message-top">
            <img src={chat?.partner?.avatar} className="avatar" />
            <h2>{chat?.partner?.username || chat?.partner?.firstName}</h2>
          </div>
          <div className="chat-section">
            {chat?.messages?.map((message: any) => (
              <div
                key={message?._id}
                className={`message-container
                    ${
                      String(userInfo._id) === String(message.sender)
                        ? "msg-right"
                        : "msg-left"
                    }
                `}
              >
                <div className="message">
                  <div className="date">
                    {String(new Date(message.date).toString()).substring(4, 15)}
                  </div>
                  <div className="content">{message.content}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-entry">
            <form className="chat-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                className="chat-entry"
                value={msg}
                onChange={(e: any) => {
                  setMsg(e.target.value);
                }}
              />
              <input type="submit" className="chat-send" value="send" />
            </form>
          </div>
        </>
      ) : (
        <div className="error">Can't load this chat :/</div>
      )}
    </div>
  );
};

export { MessageChatList };
