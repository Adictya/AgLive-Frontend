import { AgoraVideoPlayer } from "agora-rtc-react";

const WebCamFeed = (props) => {
  const { ready, tracks } = props;

  return (
    ready && (
      <AgoraVideoPlayer
        className="AgoraVideoPlayer"
        videoTrack={tracks[1]}
        style={{ height: "100%", width: "100%" }}
      />
    )
  );
};

export default WebCamFeed;
