import { AgoraVideoPlayer } from "agora-rtc-react";

const ScreenStreamFeed = (props) => {
  const { ready, tracks } = props;

  return (
    ready && (
      <AgoraVideoPlayer
        className="AgoraVideoPlayer"
        videoTrack={tracks}
        style={{ height: "100%", width: "100%" }}
      />
    )
  );
};

export default ScreenStreamFeed;
