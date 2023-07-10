"use client";
import { useContext, useMemo, useState, useLayoutEffect } from "react";
import { FilterContext } from "../../archive/components/FilterContext";
import { IStage } from "@/services/model/stage";
import { ISession } from "@/services/model/session";
import { addBlankSessions, CELL_HEIGHT } from "../utils";
import ScheduleGrid from "./ScheduleGrid";
import SessionsOnGrid from "./SessionsOnGrid";

const SchedulePage = ({ stages }: { stages: IStage[] }) => {
  const { filteredItems: sessions } = useContext(FilterContext);
  const [selectedStage, setSelectedStage] = useState(stages[0].id);
  const [isMobile, setIsMobile] = useState(false);

  const earliestTime = useMemo(
    () => Math.min(...sessions.map((session) => session.start.getTime())),
    [sessions]
  );
  const totalSlots = useMemo(
    () =>
      Math.ceil(
        (Math.max(
          ...sessions.map((session) => session.end.getTime()),
          earliestTime
        ) -
          earliestTime) /
          (1000 * 60 * 15)
      ),
    [sessions, earliestTime]
  );

  const sessionsPerStage = useMemo(
    () =>
      stages.map((stage) => ({
        stage,
        sessions: addBlankSessions(
          sessions
            .filter((session: ISession) => session.stageId === stage.id)
            .sort(
              (a: ISession, b: ISession) =>
                a.start.getTime() - b.start.getTime()
            ),
          earliestTime
        ),
      })),
    [stages, sessions, earliestTime]
  );

  useLayoutEffect(() => {
    function updateSize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!sessions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-full overflow-y-hidden">
      {isMobile ? (
        <select
          className="text-2xl cursor-pointer font-bold"
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
        >
          {stages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>
      ) : (
        <div className="w-[calc(100%-6rem)] flex flex-row ml-auto text-center p-4">
          {sessionsPerStage.map(({ stage }) => (
            <div
              key={stage.id}
              className="flex flex-col relative w-full text-xl font-semibold"
            >
              {stage.name}
            </div>
          ))}
        </div>
      )}
      <div
        className={`flex flex-row w-full h-full relative overflow-y-scroll mb-[${
          CELL_HEIGHT + "rem"
        }]`}
      >
        <ScheduleGrid earliestTime={earliestTime} totalSlots={totalSlots} />
        <div className="w-[calc(100%-6rem)] flex flex-row h-full ml-auto">
          {isMobile ? (
            <SessionsOnGrid
              sessions={
                sessionsPerStage.find(({ stage }) => stage.id === selectedStage)
                  ?.sessions
              }
              earliestTime={earliestTime}
              totalSlots={totalSlots}
            />
          ) : (
            sessionsPerStage.map(({ stage, sessions }) => (
              <SessionsOnGrid
                key={stage.id}
                sessions={sessions}
                earliestTime={earliestTime}
                totalSlots={totalSlots}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
