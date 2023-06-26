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
import PluginBar from "@/components/Layout/PluginBar";
import StageSessionInfoBox from "@/components/sessions/SessionInfoBox";
import SessionInfoBox from "@/components/sessions/SessionInfoBox";
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
    // return last session if no current session
    return stageSessions[stageSessions.length - 1];
  };

  const getSessionsForStage = async () => {
    const sessions = await sessionController.getAllSessionsForEvent(
      stage.eventId
    );
    const stageSessions = sessions.filter((ses) => ses.stageId === stage.id);
    const now = new Date();
    return stageSessions.filter((ses) => ses.end >= now);
  };

  const sessions = await getSessionsForStage();
  const currentSession = await getCurrentSessionForStage();

  if (!currentSession) {
    return (
      <div>
        <p>There are no sessions scheduled for this stage.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-h-full h-full lg:flex-row relative overflow-y-scroll">
      <div className="flex flex-col flex-grow h-full w-2/3 overflow-y-scroll box-border p-4 pr-2">
        <div className="flex flex-col h-3/4 w-full ">
          <Player playbackId={"eqwdq"} playerName={currentSession.name} />
        </div>
        <div className="h-1/4 mt-2">
          <SessionInfoBox session={currentSession.toJson()} />
        </div>
      </div>
      <div className="flex flex-col flex-grow box-border w-1/3 p-4 pl-2 h-full overflow-y-scroll">
        <PluginBar
          tabs={[
            {
              id: "schedule",
              header: <CalendarIcon />,
              content: <SessionList sessions={sessions} />,
            },
            {
              id: "chat",
              header: <ChatBubbleBottomCenterIcon />,
              content: <Chat conversationId={stage.id} />,
            },
          ]}
        />
      </div>
    </div>
  );
}
