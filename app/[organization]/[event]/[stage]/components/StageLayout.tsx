import Stage from "@/services/model/stage";
import SessionController from "@/services/controller/session";
import { InformationCircleIcon, ChatBubbleBottomCenterIcon, CalendarIcon } from "@heroicons/react/24/outline";
import SessionList from "@/components/sessions/SessionList";
import Player from "./Player";
import StageTabs from "./StageTabs";
import StageSessionInfoBox from "./StageSessionInfoBox";
export default async function StageLayout({ stage }: { stage: Stage }) {
  const sessionController = new SessionController();
  const currentSession = await sessionController.getCurrentSessionForStage(
    stage.id,
    stage.eventId
  );
  const sessions = await sessionController.getSessionsForStage(
    stage.id,
    stage.eventId
  );

  return (
    <div className="flex flex-col w-full max-h-full lg:flex-row relative">
      <div className="w-full md:h-full flex flex-col justify-center items-center bg-[#D9D9D9]">
        <Player
          streamId={stage.streamSettings.streamId}
          playerName={stage.name}
        />
      </div>
      <div className="flex flex-col flex-grow box-border h-full overflow-y-scroll relative md:relative lg:relative  lg:w-2/5 xl:1/3 md:right-0">
        <StageTabs
          tabs={[
            {
              id: "info",
              header: <InformationCircleIcon className="h-8 w-8" />,
              content: <StageSessionInfoBox session={currentSession} />
            },
            {
              id: "chat",
              header: <ChatBubbleBottomCenterIcon className="h-8 w-8" />,
              content: <div>Chat</div>,
            },
            {
              id: "Schedule",
              header: <CalendarIcon className="h-8 w-8" />,
              content: (
                <SessionList
                  sessions={sessions}
                  currentSession={currentSession}
                  isLive={false}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
