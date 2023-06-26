"use client";
import Speaker from "@/services/model/speaker";
import makeBlockie from "ethereum-blockies-base64";

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
}

export default function SpeakerIcon({
  speaker,
  onSpeakerClick,
  size = "sm",
}: Props) {
  // TODO: Fix types avatar and avatarUrl
  const avatar = speaker.photo ?? CreateBlockie(speaker.name);
  return (
    <div
      className={`flex flex-row items-center text-sm ${
        size === "sm" ? " h-8" : "w-12 h-12"
      }`}
    >
      <div
        onClick={() => onSpeakerClick?.(speaker)}
        className={`flex items-center justify-center bg-cover bg-no-repeat bg-center h-full w-8  ${
          onSpeakerClick ? "cursor-pointer" : ""
        }`}
        style={{ backgroundImage: `url('${avatar}')` }}
      />
      <span className="border-t border-r border-b border-black opacity-80 h-full p-1 hover:text-white hover:border-black hover:bg-black ">{speaker.name}</span>
    </div>
  );
}
