import { AgoraVideoPlayer, createScreenVideoTrack } from "agora-rtc-react";

const useScreenTrack = createScreenVideoTrack();

const AgoraGameContainer = (props) => {
  const { ready, tracks } = useScreenTrack();

  return (
    ready && <AgoraVideoPlayer className="AgoraVideoPlayer" videoTrack={tracks} style={{height: '100%', width: '100%'}}/>
  )
}

export default AgoraGameContainer
