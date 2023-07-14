import Stage from "@/server/model/stage";
import SessionController from "@/server/controller/session";
import {
  InformationCircleIcon,
  ChatBubbleBottomCenterIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import SessionList from "@/components/sessions/SessionList";
import Chat from "@/plugins/Chat";
import Player from "@/components/misc/Player";
import PluginBar from "@/components/Layout/PluginBar";
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
    <div className="flex flex-col w-full lg:max-h-full h-full lg:flex-row relative">
      <div className="flex flex-col flex-grow h-full w-full lg:w-[70%] lg:overflow-y-scroll box-border">
        <div className="lg:h-3/4 w-full lg:p-4 lg:pb-2 ">
          <Player playbackId={currentSession.playbackId} playerName={currentSession.name} />
        </div>
      
        <div className="lg:h-1/4 p-4 lg:pt-2">
          <SessionInfoBox session={currentSession.toJson()} />
        </div>
      </div>
      <div className=" flex flex-col flex-grow pt-2 px-4 lg:p-4 lg:pl-0 w-full lg:w-[30%] h-full ">
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
