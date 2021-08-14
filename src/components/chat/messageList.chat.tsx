import { createStyles, makeStyles } from "@material-ui/core";
import { ChatList, ChatItem } from "react-chat-elements-typescript";
import fallback from "../../static/images/icons/up.svg";
import "../../../node_modules/react-chat-elements/dist/main.css";

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
  const chats = [
    {
      avatar: fallback,
      alt: "Peter",
      user: "Peter",
      lastMessage: "Hey man",
      date: new Date(),
      unread: 2,
      id: "12312321",
    },
  ];
  const handleDataSources = chats.map((c: any) => ({
    avatar: c?.avatar,
    alt: c?.user,
    title: c?.user,
    subtitle: c?.lastMessage,
    date: new Date(c?.sent || new Date().getTime()),
    unread: c?.unread || 0,
    id: c?.id,
  }));

  return (
    <div className={classes.root}>
      <ChatList className={classes.chatList} dataSource={handleDataSources} />
    </div>
  );
};
