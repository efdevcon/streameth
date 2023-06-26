import Session from "@/services/model/session";
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
    <div className="flex flex-col w-full max-h-full lg:flex-row relative">
      <div className="flex flex-col flex-grow box-border h-full overflow-y-scrollx">
        <Player playbackId={session.playbackId} playerName={session.name} />
        <SessionInfoBox session={session.toJson()} />
      </div>
      <div className="flex flex-col flex-grow box-border h-full overflow-y-scroll relative md:relative lg:relative  lg:w-2/5 xl:1/3 md:right-0">
        <SpeakerComponent session={session} />,
      </div>
    </div>
  );
}
