import { CELL_HEIGHT, getSlotRange } from "../utils";
import { ISession } from "@/services/model/session";
import ScheduleCard from "@/components/schedule/ScheduleCard";

const SessionsOnSchedule = ({
  sessions,
  earliestTime,
  totalSlots,
}: {
  sessions: ISession[] | undefined;
  earliestTime: number;
  totalSlots: number;
}) => {
  if (!sessions) {
    return <div>No scheduled sessions</div>;
  }

  return (
    <div
      className="flex flex-col relative w-full"
      style={{ height: totalSlots * CELL_HEIGHT + "rem" }}
    >
      {sessions.map((session) => {
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
