import classes from "./StreamView.module.css";
import AgoraPlayerContainer from "../components/AgoraPlayerContainer";
import AgoraGameContainer from "../components/AgoraGameContainer";
import {
  createMicrophoneAndCameraTracks,
  createScreenVideoTrack,
  createClient,
} from "agora-rtc-react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
const config = { mode: "live", codec: "vp8" };

const appId = "1e6816ded05149088f32daa1c0d19456";

const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const useScreenTrack = createScreenVideoTrack({}, "auto");

const useClient = createClient(config);

const baseUrl = "http://localhost:8080/";

const StreamView = () => {
  let stream = {};
  const mutateStream = useMutation((stream) => {
    fetch(`${baseUrl}createStream`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        // "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify(stream),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  });
  const [cname, setCname] = useState("defaultStream");
  const client = useClient();
  const [streaming, setStreaming] = useState(false);

  const { ready: readyC, tracks: tracksC } = useMicrophoneAndCameraTracks();
  const { ready: readyS, tracks: tracksS } = useScreenTrack();
  const [trackState, setTrackState] = useState({
    video: true,
    audio: true,
    screen: true,
  });

  const createThumbnail = async () => {
    var video = document.getElementsByClassName("agora_video_player")[1];
    var canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 72;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    video = document.getElementsByClassName("agora_video_player")[0];
    ctx.drawImage(
      video,
      (canvas.width / 4) * 3,
      (canvas.height / 3) * 2,
      canvas.width / 3,
      canvas.height / 3
    );
    stream.Thumbnail = canvas.toDataURL("image/jpeg");
    console.log(stream.Thumbnail);
  };

  let init = async (name) => {
    console.log("init", name);
    await client.join(appId, name, null, null);
    setStreaming(true);
  };

  const join = async () => {
    let newName;
    if (cname === "") {
      newName = "DefaultStream" + Math.floor(Math.random() * 101);
      setCname(newName);
    } else {
      newName = cname;
    }

    if (readyC && tracksC && readyS && tracksS) {
      init(newName)
        .then(() => {
          createThumbnail();
          stream.Channel = newName;
          mutateStream.mutate(stream);
        })
        .catch((err) => {
          setStreaming(false);
          console.log(err);
        });
    }
  };

  let leave = async () => {
    if (streaming) {
      await client.leave();
      setStreaming(false);
    }
  };

  const mute = (type) => {
    if (type === "video") {
      tracksC[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    } else if (type === "audio") {
      setTrackState((ps) => {
        tracksC[0].setEnabled(!trackState.audio);
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "screen") {
      tracksS.setEnabled(!trackState.screen);
      setTrackState((ps) => {
        tracksC[0].setEnabled(!trackState.screen);
        return { ...ps, screen: !ps.screen };
      });
    }
  };

  useEffect(() => client.setClientRole("host"), [client]);

  return (
    <>
      <div className={classes.streamFlex}>
        <div className={classes.streamsLeft}>
          <div className={classes.streamContainer}>
            <div className={classes.streamHeader}>
              <strong>Stream Activity</strong>
            </div>
            <div className={classes.streams}>
              <div className={classes.Userstream}>
                <AgoraPlayerContainer ready={readyC} tracks={tracksC} />
              </div>
              <div className={classes.Gamestream}>
                <AgoraGameContainer ready={readyS} tracks={tracksS} />
              </div>
            </div>
          </div>
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
    </>
  );
};

export default StreamView;
