import { useMemo, useContext } from "react";
import {
  CELL_HEIGHT,
  getSlotRange,
  addBlankSessions,
  getEarliestTime,
  getTotalSlots,
} from "../utils";
import { ISession } from "@/services/model/session";
import ScheduleCard from "@/components/schedule/ScheduleCard";
import { FilterContext } from "../../archive/components/FilterContext";

const SessionsOnSchedule = ({ stageId }: { stageId: string }) => {
  const { filteredItems: sessions } = useContext(FilterContext);

  const earliestTime = useMemo(() => getEarliestTime(sessions), [sessions]);

  const sessionsWithBlank = useMemo(
    () =>
      addBlankSessions(
        sessions
          .filter((session: ISession) => session.stageId === stageId)
          .sort(
            (a: ISession, b: ISession) => a.start.getTime() - b.start.getTime()
          ),
        earliestTime
      ),
    [stageId, sessions, earliestTime]
  );

  if (!sessions) {
    return <div>No scheduled sessions</div>;
  }

  return (
    <div className="flex flex-col relative w-full mr-2">
      {sessionsWithBlank.map((session) => {
        const range = getSlotRange(session, earliestTime);
        return (
          <div
            key={session.id}
            className="absolute top-0 left-0 w-full h-full p-1"
            style={{
              top: range.start * CELL_HEIGHT + "rem",
              height: (range.end - range.start) * CELL_HEIGHT + "rem",
            }}
          >
            {session.name !== "Blank" && <ScheduleCard session={session} />}
          </div>
        );
      })}
    </div>
  );
};

export default SessionsOnSchedule;
