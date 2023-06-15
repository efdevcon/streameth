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
      onClick={() => onSpeakerClick?.(speaker)}
      className={`flex items-center justify-center rounded-full border border-gray-700 bg-cover bg-no-repeat bg-center p-1 ${
        size === "sm" ? "w-8 h-8" : "w-12 h-12"
      } ${onSpeakerClick ? "cursor-pointer" : ""}`}
      style={{ backgroundImage: `url('${avatar}')` }}
    ></div>
  );
}
