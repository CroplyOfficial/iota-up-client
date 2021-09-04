import {
  makeStyles,
  createStyles,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Theme,
} from "@material-ui/core";
import { MessageBox, Avatar } from "react-chat-elements-typescript";
import { KeyboardArrowUp, MoreVert, ArrowBack } from "@material-ui/icons";
import { ChatMessageList } from "./messageList.chat";
import { ChatSearchBar } from "./searchBar.chat";
import { useFallbackImage } from "../../config";
import { useState } from "react";
import { useIsMobile } from "../../utils/isMobile";
import { useEffect } from "react";

interface IProps {
  showMessages: boolean;
  setShowMessages: Function;
  showList: boolean;
  setShowList: Function;
  setChatId: (id: string) => void;
  chatId: string;
}
export const Chat = (props: IProps) => {
  const {
    showMessages,
    setShowMessages,
    showList,
    setShowList,
    chatId,
    setChatId,
  } = props;
  const isMobile = useIsMobile();

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "288px",
        maxHeight: showMessages ? "700px" : "40px",
        transition: "max-height 0.3s ease-out",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        [theme.breakpoints.down("sm")]: {
          width: showMessages ? "100vw" : "0px",
          height: showMessages ? "calc(100vh - 74px)" : "0px",
        },
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
  const handleExpand = () => {
    setShowMessages(!showMessages);
  };
  const handleBack = () => {
    setShowList(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.cardActionArea}>
          <IconButton size="small" onClick={handleBack}>
            <ArrowBack />
          </IconButton>
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
      <ChatMessageList
        setShowList={setShowList as any}
        showList={showList}
        setId={setChatId}
        id={chatId}
      />
    </div>
  );
};
