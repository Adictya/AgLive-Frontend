import React from "react";
import WebCamFeed from "components/WebCamFeed";
import ScreenStreamFeed from "components/ScreenStreamFeed";
import classes from "./StreamView.module.css";

const ViewStream = (props) => {
  return (
    <div className={classes.streamFlex}>
      <div className={classes.streamContainer}>
        <div className={classes.streamHeader}>
          <strong>Stream</strong>
        </div>
        <div className={classes.streams}>
          <div className={classes.Userstream}></div>
          <div className={classes.Gamestream}></div>
        </div>
      </div>
      <div className={`${classes.streamContainer} ${classes.chatContainer}`}>
        <div className={classes.streamHeader}>
          <strong>Chat</strong>
        </div>
        <div className={classes.chatContent}>
          <div className={classes.chats}>I am chats</div>
          <div className={classes.chatSend}>
            <textarea placeholder="Say something!" />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStream;
