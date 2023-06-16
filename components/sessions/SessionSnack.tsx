import Session from "@/services/model/session";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LiveIndicator from "@/components/sessions/LiveIndicator";
import SpeakerIconList from "@/components/speakers/SpeakerIconList";

export type SessionStatus = "active" | "past" | "normal";

interface Props {
  session: Session;
  status?: SessionStatus;
  learnMore?: boolean;
  isLive?: boolean;
  hasRecording?: boolean;
  goToStage?: boolean;
}

// const formatDateTime = (start: number, end: number) => {
//   return `${localizedMoment(start).format("MMMM D / H:mm")}-${localizedMoment(
//     end
//   ).format("H:mm")}`;
// };

export default function SessionSnack({
  session,
  learnMore,
  isLive = false,
  hasRecording = false,
  goToStage = false,
}: Props) {
  const component = (
    <a href="" className="group relative block h-64">
      <span className="absolute inset-0 border-2 border-dashed border-black"></span>

      <div className="relative flex flex-col h-full transform border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div className="p-4 h-full flex flex-col selection:!pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:px-6 lg:px-8">
          <span className="text-sm">{session.start}</span>
          <div className="mt-auto">
            {session.speakers.length > 0 && (
              <SpeakerIconList speakers={session.speakers} />
            )}

            <h2 className="mt-4 text-xl font-medium sm:text-2xl">
              {session.name}
            </h2>
          </div>
        </div>
        <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
          <h3 className="mt-4 text-xl font-medium sm:text-2xl">
            {session.name}
          </h3>

          <p className="mt-4 text-sm sm:text-base">{session.description}</p>
        </div>
      </div>
    </a>
  );

  if (learnMore)
    return <Link href={"/session/" + session.id}>{component}</Link>;
  if (goToStage)
    return <Link href={"/stage/" + session.stageId}>{component}</Link>;
  return component;
}
