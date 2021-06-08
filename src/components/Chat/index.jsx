import React from "react";
import classes from "./Chat.module.css";
import Modal from "components/Modal";

const Chat = () => {
  return (
    <Modal styles={classes.chatContainer} heading="Chat">
      <div className={classes.chatContent}>
        <div className={classes.chats}>I am chats</div>
        <div className={classes.chatSend}>
          <textarea placeholder="Say something!" />
          <button>Send</button>
        </div>
      </div>
    </Modal>
  );
};

export default Chat;
