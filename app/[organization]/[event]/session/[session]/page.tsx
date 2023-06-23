import SessionController from "@/services/controller/session";
import EventController from "@/services/controller/event";
import Session from "@/services/model/session";
import SessionComponent from "./components/SessionComponent";
import { notFound } from "next/navigation";
interface Params {
  params: {
    event: string;
    session: string;
  };
}

export async function generateStaticParams() {
  const sessions: Session[] = [];
  const eController = new EventController();
  const sController = new SessionController();
  const events = await eController.getAllEvents();
  for (const event of events) {
    const eventSessions = await sController.getAllSessionsForEvent(event.id);
    sessions.push(...eventSessions);
  }

  const paths = sessions.map((session) => {
    return {
      params: {
        eventId: session.eventId,
        sessionId: session.id,
      },
    };
  });
  return paths;
}

export default async function Page({ params }: Params) {
  const sController = new SessionController();
  console.log(params);
    const session = await sController.getSession(
      params.session,
      params.event
    );

    return <SessionComponent session={session} />;
}
