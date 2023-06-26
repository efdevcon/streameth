import Stage from "@/services/model/stage";
import SessionController from "@/services/controller/session";
import {
  InformationCircleIcon,
  ChatBubbleBottomCenterIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import SessionList from "@/components/sessions/SessionList";
import Chat from "@/plugins/Chat";
import Player from "@/components/misc/Player";
import StageTabs from "@/components/Layout/PluginBar";
import StageSessionInfoBox from "@/components/sessions/SessionInfoBox";

export default async function StageLayout({ stage }: { stage: Stage }) {
  const sessionController = new SessionController();
  const getCurrentSessionForStage = async () => {
    const sessions = await sessionController.getAllSessionsForEvent(
      stage.eventId
    );
    const stageSessions = sessions.filter((ses) => ses.stageId === stage.id);
    for (const session of stageSessions) {
      const now = new Date();
      if (session.start <= now && session.end >= now) {
        return session;
      }
    }
    return undefined;
  };

  const currentSession = await getCurrentSessionForStage();

  const getSessionsForStage = async () => {
    const sessions = await sessionController.getAllSessionsForEvent(
      stage.eventId
    );
    const stageSessions = sessions.filter((ses) => ses.stageId === stage.id);
    const now = new Date();
    return stageSessions.filter((ses) => ses.end >= now);
  };

  const sessions = await getSessionsForStage();

  return (
    <div className="flex flex-col w-full max-h-full lg:flex-row relative">
      <Player
        streamId={stage.streamSettings.streamId}
        playerName={stage.name}
      />
      <StageSessionInfoBox session={currentSession} />
      <div className="flex flex-col flex-grow box-border h-full overflow-y-scroll">
        <StageTabs
          tabs={[
            {
              id: "info",
              header: <InformationCircleIcon className="h-8 w-8" />,
              content: <StageSessionInfoBox session={currentSession} />,
            },
            {
              id: "chat",
              header: <ChatBubbleBottomCenterIcon className="h-8 w-8" />,
              content: <Chat conversationId={stage.name} />,
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
