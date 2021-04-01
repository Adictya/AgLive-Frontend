import { AgoraVideoPlayer} from "agora-rtc-react";


const AgoraGameContainer = (props) => {
  const tracks = props.tracks

  return (
    <AgoraVideoPlayer className="AgoraVideoPlayer" videoTrack={tracks} style={{height: '100%', width: '100%'}}/>
  )
}

export default AgoraGameContainer
