import { ISession } from "@/services/model/session";
import Link from "next/link";
import SpeakerIconList from "@/components/speakers/SpeakerIconList";
export type SessionStatus = "active" | "past" | "normal";
import Image from "next/image";
interface Props {
  session: ISession;
  status?: SessionStatus;
  learnMore?: boolean;
  isLive?: boolean;
  hasRecording?: boolean;
  goToStage?: boolean;
}

export default async function SessionSnack({
  session,
  learnMore = false,
  goToStage = false,
}: Props) {
  const component = (
    <div className="flex flex-col p-4 border-b-2 border-b-accent">
      <Image
        src={extractFirstFrame(session.videoUrl, ".")}
        width={300}
        height={200}
      />
    </div>
  );

  if (learnMore) return <Link href={"session/" + session.id}>{component}</Link>;
  if (goToStage)
    return <Link href={"/stage/" + session.stageId}>{component}</Link>;
  return component;
}
