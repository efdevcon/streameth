"use client";
import Speaker from "@/server/model/speaker";
import makeBlockie from "ethereum-blockies-base64";
import { SocialIcon } from "react-social-icons";

function CreateBlockie(username: string) {
  if (!username) {
    return "";
  }
  return makeBlockie(username);
}

interface Props {
  speaker: Speaker;
  size?: "sm" | "md";
  onSpeakerClick?: (speaker: Speaker) => void;
  onlyImage?: boolean;
  twitter?: boolean;
}

export default function SpeakerIcon({
  speaker,
  onSpeakerClick,
  size = "sm",
  onlyImage = false,
  twitter = false,
}: Props) {
  // TODO: Fix types avatar and avatarUrl
  const avatar = speaker.photo ?? CreateBlockie(speaker.name);
  return (
    <div
      className={`flex flex-row items-center text-sm ${
        size == "md" ? "h-12" : "h-8"
      }`}
    >
      <div
        onClick={() => onSpeakerClick?.(speaker)}
        className={`flex items-center justify-center bg-cover bg-no-repeat bg-center h-full rounded mr-2 ${
          size == "md" ? "w-12" : "w-8"
        }`}
        style={{ backgroundImage: `url('${avatar}')` }}
      />
      {!onlyImage && (
        <span className="text-main-text text-lg">{speaker.name}</span>
      )}
      {twitter && (
        <SocialIcon
          url={`https://twitter.com/${speaker.twitter}`}
          target="_blank"
          bgColor="#fff"
          fgColor="#1DA1F2"
          className={`ml-2 ${size == "md" ? "h-8 w-8" : "w-8"}`}
        />
      )}
    </div>
  );
}
