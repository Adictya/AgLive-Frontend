import classes from "./StreamView.module.css";
import WebCamFeed from "components/WebCamFeed";
import ScreenStreamFeed from "components/ScreenStreamFeed";
import StreamControls from "components/StreamControls";
import Chat from "components/Chat";
import Modal from "components/Modal";
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

const baseUrl = "http://localhost:8000/";

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
  const deleteStream = useMutation((stream) => {
    fetch(`${baseUrl}deleteStream`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(stream),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  });
  const [cname, setCname] = useState("");
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
      deleteStream.mutate({ Channel: stream.Channel });
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
          <StreamControls
            cname={cname}
            setCname={setCname}
            trackState={trackState}
            mute={mute}
            streaming={streaming}
            join={join}
            leave={leave}
          />
        </div>
        <Chat />
      </div>
    </>
  );
};

export default StreamView;
