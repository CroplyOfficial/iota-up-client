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

export const ChatMessageList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [id, setId] = useState<string>();
  const [chatsLoaded, setChatsLoaded] = useState<any[]>();
  const [chatsData, setChatsData] = useState<any[]>();
  const [showList, setShowList] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getMyChats());
  }, []);

  const chatsMeta: any = useSelector((state: RootState) => state.myChats);
  const usersMeta: any = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = usersMeta;
  const { chats, error, loading } = chatsMeta;

  useEffect(() => {
    setChatsLoaded(chats?.chats);
    if (chats?.chats) {
      const handleDataSources = chats?.chats?.map((c: any) => {
        const otherMember = c?.members.filter(
          (member: any) => String(member._id) !== String(userInfo._id)
        )[0];
        const otherName = otherMember.username ?? otherMember.firstName;
        return {
          avatar: otherMember.avatar,
          alt: otherName,
          title: otherName,
          subtitle: "asdf",
          date: new Date(c?.sent || new Date().getTime()),
          unread: c?.unread || 1,
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
      ) : !showList ? (
        <MessageChatList id={id} />
      ) : (
        <div className="err">unable to load messages</div>
      )}
    </div>
  );
};
