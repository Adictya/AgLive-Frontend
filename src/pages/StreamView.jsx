import classes from './StreamView.module.css'
import AgoraPlayerContainer from '../components/AgoraPlayerContainer'
import AgoraGameContainer from '../components/AgoraGameContainer'
import {
  // createMicrophoneAndCameraTracks,
  createClient
} from 'agora-rtc-react'
import {useEffect} from 'react'

const config = {mode: 'live', codec: 'vp8'}
const appId = '1e6816ded05149088f32daa1c0d19456'

// const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const useClient = createClient(config)

const StreamView = (props) => {
  const client = useClient()
  const cname = props.channelName? props.channelName : "defaultStream"
  const uname = props.userName? props.userName : "defaultUser"
  useEffect(()=>client.setClientRole('host'),[])
  useEffect(() => {
    let init = async (name) => {
      console.log("init",name);
      await client.join(appId,name,null,uname)
    }
    init(cname)
  },[cname,client,uname])
  return (
    <>
      <div className={classes.streamContainer}>
        <div className={classes.streamHeader}>
          <strong>Stream Activity</strong>
        </div>
        <div style={{position: 'relative'}}>
          <div className={classes.Userstream}>
            <AgoraPlayerContainer />
          </div>
        </div>
        <div className={classes.Gamestream}>
          <AgoraGameContainer />
        </div>
      </div>
      <div className={classes.streamContainer} style={{height: '10rem'}}>
        <div className={classes.streamHeader}>
          <strong>Streaming Details</strong>
        </div>
      </div>
    </>
  )
}

export default StreamView
