import Session from "@/server/model/session";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Player from "@/components/misc/Player";
import StageTabs from "@/components/Layout/PluginBar";
import SessionInfoBox from "@/components/sessions/SessionInfoBox";
import ComponetCard from "@/components/misc/ComponentCard";
import SpeakerIconList from "@/components/speakers/SpeakerIconList";
const SpeakerComponent = ({ session }: { session: Session }) => {
  return (
    <ComponetCard title="Speakers">
      <SpeakerIconList speakers={session.speakers} />;
    </ComponetCard>
  );
};
export default async function SessionComponent({
  session,
}: {
  session: Session;
}) {
  return (
    <div className="flex flex-col w-full max-h-full h-full lg:flex-row relative overflow-y-scroll">
      <div className="flex flex-col flex-grow h-full w-3/4 overflow-y-scroll box-border p-4 pr-2">
        <div className="flex flex-col h-3/4 w-full ">
          <Player playbackId={session.playbackId} playerName={session.name} />
        </div>
        <div className="h-1/4 mt-2">
          <SessionInfoBox session={session.toJson()} />
        </div>
      </div>
      <div className="flex flex-col flex-grow box-border p-4 pl-2 h-full overflow-y-scroll">
        <SpeakerComponent session={session} />,
      </div>
    </div>
  );
}
