import React , {useState} from "react";
import VideoJS from "./VideoJS"
import { get } from "../../utils/requests";

  // We could link player state to player header using setStatus
  enum PlayerState {
    Idle,
    Playing,
    Error
  }


const Player = ({mainSrc, backUpSrc, poster, setStatus} : {
  mainSrc: string,
  backUpSrc: string,
  poster: string,
  setStatus: (status: string) => void
}) => {

  const playerRef = React.useRef(null);
  const [videoJsOptions, setVideoJsOptions] = useState({
    poster: poster || "",
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: mainSrc,
      type: 'application/x-mpegURL'
    }]
  })

  // TODO: change type
  const handlePlayerReady = (player:any) => {
    playerRef.current = player;


    player.reloadSourceOnError({

      // getSource allows you to override the source object used when an error occurs
      getSource: function(reload) {
        console.log('Reloading because of an error');
    
        // call reload() with a fresh source object
        // you can do this step asynchronously if you want (but the error dialog will
        // show up while you're waiting)
        reload({
          src: backUpSrc,
          type: 'application/x-mpegURL'
        });
      },
    
      // errorInterval specifies the minimum amount of seconds that must pass before
      // another reload will be attempted
      errorInterval: 5
    });

    player.on('error', (e) => {
      console.log('error', e);
    });

    player.on('ready', () => {
      player.tech().on('usage', (e) => {
        console.log(e.name);
      });
    });

    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };


  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

}

export default Player;