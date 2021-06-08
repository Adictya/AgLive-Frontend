import React from 'react'
import classes from './Chat.module.css'

const Chat = ()=>{
	return(
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

	)
}

export default Chat
