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
  const [msgId, setMsgId] = useState<string>();
  const [editing, setEditing] = useState<boolean>(false);

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
    editMessage,
    deleteMessage,
  }: {
    chat: any;
    messages: any;
    isBlocked: boolean;
    canUnblock: boolean;
    sendMessage: (message: string) => void;
    toggleBlock: () => void;
    deleteChat: () => void;
    editMessage: (msgId: string, msg: string) => void;
    deleteMessage: (msgId: string) => void;
  } = useChat({
    chatId: id,
    token: userInfo.token,
  });
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const [anchorChat, setAnchorChat] = useState<any>(null);
  const openChatContext = Boolean(anchorChat);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseChatContext = () => {
    setAnchorChat(null);
  };
  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (editing && msgId && msg) {
      editMessage(msgId, msg);
      setEditing(false);
      setMsg("");
    } else if (msg) {
      sendMessage(msg);
      setMsg("");
    }
  };
  const handleEditMessage = () => {
    setEditing(true);
    const message: any = messages.find((message: any) => message._id === msgId);
    setMsg(message.content);
    setAnchorChat(null);
  };
  const handleCopyMessage = () => {
    const message: any = messages.find((message: any) => message._id === msgId);
    navigator.clipboard.writeText(message?.content);
    setAnchorChat(null);
  };
  const handleDeleteMessage = () => {
    if (msgId) {
      deleteMessage(msgId);
      setAnchorChat(null);
    }
  };
  const handleMessageRightClick = (e: any, id: string) => {
    e.preventDefault();
    setMsgId(id);
    setAnchorChat(e.currentTarget);
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
                style={{ zIndex: 100000 }}
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
              <Menu
                id="long-menu"
                anchorEl={anchorChat}
                keepMounted
                open={openChatContext}
                style={{ zIndex: 100000 }}
                onClose={handleCloseChatContext}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: "20ch",
                  },
                }}
              >
                <MenuItem onClick={handleEditMessage}>Edit Message</MenuItem>
                <MenuItem onClick={handleCopyMessage}>Copy Message</MenuItem>
                <MenuItem onClick={handleDeleteMessage}>
                  Delete Message
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
                <div
                  className="message"
                  onContextMenu={(e) => {
                    if (String(userInfo._id) === String(message.sender))
                      handleMessageRightClick(e, message?._id);
                  }}
                >
                  <div className="date">
                    {String(new Date(message.date).toString()).substring(4, 15)}
                  </div>
                  <div
                    className={
                      message.content !== "this message was deleted"
                        ? "content"
                        : "deleted"
                    }
                  >
                    {message.content}
                  </div>
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
