"use client";

import { Player as LivepeerPlayer, useStream } from "@livepeer/react";
import { useCallback } from "react";

// @ts-ignore
import mux from "mux-embed";
import Image from "next/image";

const OfflinePlayer = () => {
  return (
    <div className=" inset-0 bg-[#D9D9D9] flex items-center justify-center flex-col aspect-video">
      <span className="text-2xl font-bold text-black">Offline</span>
      <span className="text-black dark:text-gray-300 text-xs hidden md:block mt-2">
        Powered by
      </span>
      <a
        className="relative w-24 lg:w-32 h-6"
        href="https://streameth.org"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/streameth.png"
          alt="streamETH"
          layout="fill"
          objectFit="contain"
        />
      </a>
    </div>
  );
};

export const Player = ({
  streamId,
  playerName,
}: {
  streamId: string;
  playerName: string;
}) => {
  const { data: stream } = useStream({
    streamId: streamId,
    refetchInterval: (s) => (s?.isActive ? false : 5000),
  });

  const mediaElementRef = useCallback(
    (ref: HTMLMediaElement) => {
      if (ref && process.env.NEXT_PUBLIC_MUX_ENV_KEY) {
        const initTime = mux.utils.now();
        mux.monitor(ref, {
          debug: false,
          data: {
            env_key: process.env.NEXT_PUBLIC_MUX_ENV_KEY, // required
            // Metadata fields
            player_name: playerName ?? "livepeer player", // any arbitrary string you want to use to identify this player
            player_init_time: initTime,
          },
        });
      }
    },
    [playerName]
  );

  if (!stream?.isActive) return <OfflinePlayer />;

  return (
    <LivepeerPlayer
      mediaElementRef={mediaElementRef}
      objectFit="cover"
      src={stream.playbackUrl}
      showTitle={false}
      showPipButton={false}
      muted={false}
      autoPlay
    />
  );
};

export default Player;
