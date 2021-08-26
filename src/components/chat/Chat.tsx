import {
  makeStyles,
  createStyles,
  Typography,
  SvgIcon,
  IconButton,
  CardActionArea,
} from "@material-ui/core";
import { MessageBox, Avatar } from "react-chat-elements-typescript";
import { KeyboardArrowUp, PostAdd, MoreHoriz } from "@material-ui/icons";
import { ChatMessageList } from "./messageList.chat";
import { ChatSearchBar } from "./searchBar.chat";
import { useFallbackImage } from "../../config";
import { useState } from "react";

export const Chat = () => {
  const [showMessages, setShowMessages] = useState<boolean>(false);
  const [chat, setChat] = useState<string>();
  const [showList, setShowList] = useState<boolean>(true);
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "288px",
        maxHeight: showMessages ? "700px" : "40px",
        transition: "max-height 0.3s ease-out",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      },
      header: {
        width: "100%",
        boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, .3)",
        height: "48px",
        backgroundColor: "white",
        borderRadius: "10px 10px 0 0",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        paddingLeft: "4px",
        paddingRight: "4px",
        "&:hover": {
          background: "#F5F5F5",
          transition: "0.3s ease-in",
        },
        cursor: "pointer",
      },
      end: {
        marginLeft: "auto",
        display: "flex",
        gap: "4px",
      },
      text: {
        fontFamily: "Open Sans",
        fontWeight: 700,
        fontStyle: "normal",
        fontSize: "13.33px",
        lineHeight: "100%",
      },
      avatar: {
        height: "32px",
        width: "32px",
        overflow: "hidden",
        borderRadius: "50%",
      },
      cardActionArea: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        justifyContent: "flex-start",
      },
    })
  );

  const classes = useStyles();
  const fallback = useFallbackImage();
  const handleExpand = () => {
    setShowMessages(!showMessages);
  };
  const handleMoreOptions = () => null;
  const handleNewMessage = () => null;
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div onClick={handleExpand} className={classes.cardActionArea}>
          <Typography variant="body2" component="span" className={classes.text}>
            Messages
          </Typography>
        </div>
        <div className={classes.end}>
          <IconButton size="small" onClick={handleExpand}>
            <KeyboardArrowUp />
          </IconButton>
        </div>
      </div>
      <ChatMessageList />
    </div>
  );
};
