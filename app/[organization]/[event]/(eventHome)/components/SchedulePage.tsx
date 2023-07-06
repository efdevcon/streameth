"use client";
import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../archive/components/FilterContext";
import { IStage } from "@/services/model/stage";
import { ISession } from "@/services/model/session";
import ScheduleCard from "@/components/schedule/ScheduleCard";

const addBlankSessions = (sessions: ISession[], earliestTime: number) => {
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

const SchedulePage = ({ stages }: { stages: IStage[] }) => {
  const { filteredItems: sessions } = useContext(FilterContext);
  const CELL_HEIGHT = 4;

  const earliestTime = Math.min(
    ...sessions.map((session) => session.start.getTime())
  );

  const sessionsPerStage = stages.map((stage) => ({
    stage,
    sessions: addBlankSessions(
      sessions
        .filter((session: ISession) => session.stageId === stage.id)
        .sort(
          (a: ISession, b: ISession) => a.start.getTime() - b.start.getTime()
        ),
      earliestTime
    ),
  }));

  const totalSlots = Math.ceil(
    (Math.max(
      ...sessions.map((session) => session.end.getTime()),
      earliestTime
    ) -
      earliestTime) /
      (1000 * 60 * 15)
  );

  const getSlotRange = (session: ISession) => {
    const start = Math.floor(
      (session.start.getTime() - earliestTime) / (1000 * 60 * 15)
    );
    const end = Math.ceil(
      (session.end.getTime() - earliestTime) / (1000 * 60 * 15)
    );
    console.log(session, start, end);
    return { start, end };
  };

  if (!sessions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-full overflow-y-hidden">
      <div className="w-[calc(100%-5rem)] flex flex-row ml-auto text-center p-4">
        {sessionsPerStage.map(({ stage, sessions }) => (
          <div key={stage.id} className="flex flex-col relative w-full text-xl font-semibold">
            {stage.name}
          </div>
        ))}
      </div>
      <div className={`flex flex-row w-full h-full relative overflow-y-scroll mb-[${CELL_HEIGHT + "rem"}]`}>
        <div
          className="flex flex-col w-full absolute top-0 r-0"
          style={{ height: totalSlots * CELL_HEIGHT + "rem" }}
        >
          {Array.from({ length: totalSlots }, (_, i) => (
            <div key={i} className="w-full h-full border-t p-4">
              <h1 className="w-full">
                {new Date(
                  earliestTime + i * 15 * 60 * 1000
                ).toLocaleTimeString()}
              </h1>
            </div>
          ))}
        </div>
        <div className="w-[calc(100%-5rem)] flex flex-row h-full ml-auto">
          {sessionsPerStage.map(({ stage, sessions }) => (
            <div
              key={stage.id}
              className="flex flex-col relative w-full"
              style={{ height: totalSlots * CELL_HEIGHT + "rem" }}
            >
              {sessions.map((session) => {
                const range = getSlotRange(session);
                return (
                  <div
                    key={session.id}
                    className="absolute top-0 left-0 w-full h-full p-1"
                    style={{
                      top: range.start * CELL_HEIGHT + "rem",
                      height: (range.end - range.start) * CELL_HEIGHT + "rem",
                    }}
                  >
                    {session.name !== "Blank" && (
                      <ScheduleCard session={session} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
