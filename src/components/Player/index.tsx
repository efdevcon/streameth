import React from "react";
import VideoJS from "./VideoJS"


const Player = () => {

  const sources = []
  const playerRef = React.useRef(null);

  const videoJsOptions = { // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://d2zihajmogu5jn.cloudfront.net/ipbop-advanced/bipbop_16x9_variant.m3u8',
      type: 'application/x-mpegURL'
    }]
  }

  // TODO: change type
  const handlePlayerReady = (player:any) => {
    playerRef.current = player;

    // player.on('error', (e) => {
    //   console.log('error', e);
    // });

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