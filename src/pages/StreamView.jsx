import classes from './StreamView.module.css'
import AgoraPlayerContainer from '../components/AgoraPlayerContainer'
import AgoraGameContainer from '../components/AgoraGameContainer'
import {
  createClient
} from 'agora-rtc-react'
import {useEffect} from 'react'

const config = {mode: 'live', codec: 'vp8'}
const appId = ''

const useClient = createClient(config)

const StreamView = () => {
  const client = useClient()
  useEffect(()=>client.setClientRole('host'),[])
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
