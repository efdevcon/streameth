import { ISession } from "@/services/model/session";

export const addBlankSessions = (
  sessions: ISession[],
  earliestTime: number
) => {
  const blankSessions: ISession[] = [];
  let lastSession: ISession | undefined;
  if (sessions[0]?.start.getTime() > earliestTime) {
    blankSessions.push({
      id: "blank" + (sessions[0]?.id || "start"),
      name: "Blank",
      start: new Date(earliestTime),
      end: new Date(sessions[0].start.getTime()),
      stageId: sessions[0]?.stageId || "",
      speakers: [],
      description: "",
      eventId: sessions[0]?.eventId || "",
    });
  }

  for (const session of sessions) {
    if (
      lastSession &&
      session.start.getTime() - lastSession.end.getTime() > 0
    ) {
      blankSessions.push({
        id: "blank" + lastSession.id,
        name: "Blank",
        start: lastSession.end,
        end: session.start,
        stageId: lastSession.stageId,
        speakers: [],
        description: "",
        eventId: lastSession.eventId,
      });
    }
    lastSession = session;
  }
  return [...sessions, ...blankSessions];
};

export const getSlotRange = (session: ISession, earliestTime: number) => {
  const start = Math.floor(
    (session.start.getTime() - earliestTime) / (1000 * 60 * 15)
  );
  const end = Math.ceil(
    (session.end.getTime() - earliestTime) / (1000 * 60 * 15)
  );
  return { start, end };
};

export const CELL_HEIGHT = 4;
