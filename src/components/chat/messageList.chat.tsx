import { createStyles, makeStyles } from "@material-ui/core";
import {
  ChatList,
  ChatItem,
  MessageList,
} from "react-chat-elements-typescript";
import fallback from "../../static/images/icons/up.svg";
import "../../../node_modules/react-chat-elements/dist/main.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyChats } from "../../actions/chatActions";
import { RootState } from "../../store";
import { MessageChatList } from "./chatList";
import { io } from "socket.io-client";
import { IChat } from "../../interfaces/chat.interface";
import { BARE_API } from "../../config";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      height: "700px",
      backgroundColor: "white",
    },
    chatList: {},
  })
);

let socket: any;

interface IProps {
  showList: boolean;
  setShowList: (value: boolean) => void;
}
export const ChatMessageList = (props: IProps) => {
  const { showList, setShowList } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [id, setId] = useState<string>();
  const [chatsLoaded, setChatsLoaded] = useState<any[]>();
  const [chatsData, setChatsData] = useState<any[]>();
  const [chats, setChats] = useState<any>();

  const usersMeta: any = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = usersMeta;

  useEffect(() => {
    socket = io(BARE_API);

    socket.on("connect", () => {
      if (!userInfo) return;
      socket.emit("myChats", { token: userInfo.token });
    });

    socket.on("chat", (chat: any) => {
      setChats(chat);
    });
  }, []);

  useEffect(() => {
    console.log(chats);
    setChatsLoaded(chats?.chats);
    if (chats) {
      const handleDataSources = chats?.map((c: any) => {
        const otherMember = c?.members.filter(
          (member: any) => String(member._id) !== String(userInfo._id)
        )[0];
        const otherName = otherMember.username ?? otherMember.firstName;
        return {
          avatar: otherMember.avatar,
          alt: otherName,
          title: otherName,
          subtitle: c?.messages[0] ? c.messages[0].content : "",
          date: new Date(c?.sent || new Date().getTime()),
          id: c?._id,
        };
      });
      setChatsData(handleDataSources);
    }
  }, [chats]);

  const handleChatClick = (chatId: string) => {
    console.log(`ChatID ${chatId}`);
    setShowList(false);
    setId(chatId);
  };

  const texts = [
    {
      position: "right",
      type: "text",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
      date: new Date(),
    },
    {
      position: "right",
      type: "text",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
      date: new Date(),
    },
  ];

  return (
    <div className={classes.root}>
      {showList && chatsData ? (
        <ChatList
          className={classes.chatList}
          dataSource={chatsData}
          onClick={(e: any) => {
            handleChatClick(e.id);
          }}
        />
      ) : !showList && id ? (
        <MessageChatList id={id} />
      ) : (
        <div className="err">unable to load messages</div>
      )}
    </div>
  );
};
