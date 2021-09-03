import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import "./messages.css";
import useChat from "./useChat";
import { IconButton, MenuItem, Menu } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

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
    messages,
    isBlocked,
    canUnblock,
    sendMessage,
    toggleBlock,
    deleteChat,
  }: {
    chat: any;
    messages: any;
    isBlocked: boolean;
    canUnblock: boolean;
    sendMessage: (message: string) => void;
    toggleBlock: () => void;
    deleteChat: () => void;
  } = useChat({
    chatId: id,
    token: userInfo.token,
  });
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
            <div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50px",
                }}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {((isBlocked && canUnblock) || !isBlocked) && (
                  <MenuItem
                    onClick={(e: any) => {
                      toggleBlock();
                      setAnchorEl(null);
                    }}
                  >
                    {isBlocked && canUnblock
                      ? "Unblock Contact"
                      : "Block Contact"}
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    deleteChat();
                    setAnchorEl(null);
                  }}
                >
                  Delete Conversation
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="chat-section">
            {messages?.map((message: any) => (
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
                disabled={isBlocked}
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
