import React from "react";
import classes from "./StreamControls.module.css";

const StreamControls = ({cname ,setCname, trackState , mute, streaming , join , leave }) =>{
	return(
          <div className={`${classes.streamContainer} ${classes.controlsRoot}`}>
            <div className={classes.streamHeader}>
              <strong>Streaming Details</strong>
            </div>
            <div className={classes.controlsContainer}>
              <div className={classes.inputContainer}>
                <label>Stream Name</label>
                <br />
                <input
                  type="text"
                  placeholder="defaultStream"
                  id="channelName"
                  value={cname}
                  onChange={(e) => setCname(e.target.value)}
                  className={classes.inputBox}
                />
              </div>
              <div className={classes.controls}>
                <div className={classes.buttons}>
                  <button
                    className={classes.mediaButton}
                    id="audio"
                    onClick={() => mute("audio")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill={trackState.audio ? "#1DA1F3" : "#AEAEAE"}
                    >
                      <path
                        fillRule="evenodd"
                        d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className={classes.mediaButton}
                    id="webcam"
                    onClick={() => mute("video")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill={trackState.video ? "#1DA1F3" : "#AEAEAE"}
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </button>
                  <button
                    className={classes.mediaButton}
                    id="stream"
                    onClick={() => mute("screen")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill={trackState.screen ? "#1DA1F3" : "#AEAEAE"}
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {!streaming ? (
                  <button
                    className={`${classes.button} ${classes.startButton}`}
                    onClick={join}
                  >
                    Start Stream
                  </button>
                ) : (
                  <button
                    className={`${classes.button} ${classes.endButton}`}
                    onClick={leave}
                  >
                    End Stream
                  </button>
                )}
              </div>
            </div>
          </div>
	)
}

export default StreamControls;
