import classes from "./StreamView.module.css";
import WebCamFeed from "components/WebCamFeed";
import ScreenStreamFeed from "components/ScreenStreamFeed";
import Chat from "components/Chat";
import Modal from "components/Modal";
import {
  createMicrophoneAndCameraTracks,
  createScreenVideoTrack,
  createClient,
} from "agora-rtc-react";
import { useEffect  } from "react";
const config = { mode: "live", codec: "vp8" };

const appId = "*****************************";

const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const useScreenTrack = createScreenVideoTrack({}, "auto");

const useClient = createClient(config);

const ViewStream = (props) => {
  let stream = {};
  const client = useClient();
  const { ready: readyC, tracks: tracksC } = useMicrophoneAndCameraTracks();
  const { ready: readyS, tracks: tracksS } = useScreenTrack();

  let init = async (name) => {
    await client.join(appId, name, null, null);
  };

  const join = async () => {
    let newName = props.match.params.channel
    if (readyC && tracksC && readyS && tracksS) {
      init(newName)
        .then(() => {
          stream.Channel = newName;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {client.setClientRole("audience");join()});

  return (
    <>
      <div className={classes.streamFlex}>
        <div className={classes.streamsLeft}>
          <Modal heading="Stream Activity">
            <div className={classes.streams}>
              <div className={classes.Userstream}>
                <WebCamFeed ready={readyC} tracks={tracksC} />
              </div>
              <div className={classes.Gamestream}>
                <ScreenStreamFeed ready={readyS} tracks={tracksS} />
              </div>
            </div>
          </Modal>
        </div>
        <Chat />
      </div>
    </>
  );
};

export default ViewStream;
