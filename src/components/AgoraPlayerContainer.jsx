import { AgoraVideoPlayer, createMicrophoneAndCameraTracks } from "agora-rtc-react";


const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const AgoraPlayerContainer = (props) => {
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  return (
    ready && <AgoraVideoPlayer className="AgoraVideoPlayer" videoTrack={tracks[1]} style={{height: '100%', width: '100%'}}/>
  )
}

export default AgoraPlayerContainer
