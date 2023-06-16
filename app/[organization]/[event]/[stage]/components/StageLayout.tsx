import Stage from "@/services/model/stage";
import SessionController from "@/services/controller/session";

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
    <div className="flex flex-col w-full max-h-full lg:flex-row">
      <div className="w-full h-full flex flex-col justify-center items-center bg-[#D9D9D9]">
        <Player
          streamId={stage.streamSettings.streamId}
          playerName={stage.name}
        />
      </div>
      <div className="flex flex-col lg:w-1/3 box-border lg:h-full px-2">
        <StageTabs
          tabs={[
            {
              id: "info",
              header: "Info",
              content: <StageSessionInfoBox session={currentSession} />
            },
            {
              id: "chat",
              header: "Chat",
              content: <div>Chat</div>,
            },
            {
              id: "sessions",
              header: "Sessions",
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
