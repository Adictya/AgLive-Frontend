import classes from "./StreamView.module.css";
import AgoraPlayerContainer from "../components/AgoraPlayerContainer";
import AgoraGameContainer from "../components/AgoraGameContainer";
import {
  createMicrophoneAndCameraTracks,
  createScreenVideoTrack,
  createClient,
} from "agora-rtc-react";
import { useEffect, useState } from "react";

const config = { mode: "live", codec: "vp8" };
const appId = "1e6816ded05149088f32daa1c0d19456";

const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const useScreenTrack = createScreenVideoTrack();

const useClient = createClient(config);

const StreamView = (props) => {
  const client = useClient();
  const cname = props.channelName ? props.channelName : "defaultStream";
  const uname = props.userName ? props.userName : "defaultUser";
  const [streaming, setStreaming] = useState(false);
  const { ready: readyC, tracks: tracksC } = useMicrophoneAndCameraTracks();
  const { ready: readyS, tracks: tracksS } = useScreenTrack();

  let init = async (name) => {
    console.log("init", name);
    await client.join(appId, name, null, uname);
    setStreaming(true);
  };

  const join = () => {
    if (readyC && tracksC && readyS && tracksS) init(cname);
  };

  useEffect(() => client.setClientRole("host"), [client]);

  return (
    <>
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
      <div className={classes.streamContainer} style={{ height: "10rem" }}>
        <div className={classes.streamHeader}>
          <strong>Streaming Details</strong>
        </div>
        <button className={classes.mediaButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={readyC ? "#1DA1F3" : "#AEAEAE"}
          >
            <path
              fillRule="evenodd"
              d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button className={classes.mediaButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={readyC ? "#1DA1F3" : "#AEAEAE"}
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        </button>
        {!streaming ? (
          <button className={classes.startButton} onClick={join}>
            Start Stream
          </button>
        ) : (
          <button className={classes.endButton}>End Stream</button>
        )}
      </div>
    </>
  );
};

export default StreamView;
