import Session from "@/services/model/session";
import SessionController from "@/services/controller/session";
import {
  InformationCircleIcon,
  ChatBubbleBottomCenterIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import Player from "@/components/misc/Player";
import StageTabs from "@/components/Layout/PluginBar";
import SessionInfoBox from "@/components/sessions/SessionInfoBox";

export default async function SessionComponent({
  session,
}: {
  session: Session;
}) {
  return (
    <div className="flex flex-col w-full max-h-full lg:flex-row relative">
      <div className="w-full md:h-full flex flex-col justify-center items-center bg-[#D9D9D9]">
        <Player
          playbackId={session.playbackId}
          playerName={session.name}
        />
      </div>
      <div className="flex flex-col flex-grow box-border h-full overflow-y-scroll relative md:relative lg:relative  lg:w-2/5 xl:1/3 md:right-0">
        <StageTabs
          tabs={[
            {
              id: "info",
              header: <InformationCircleIcon className="h-8 w-8" />,
              content: <SessionInfoBox session={session.toJson()} />,
            },
          ]}
        />
      </div>
    </div>
  );
}
