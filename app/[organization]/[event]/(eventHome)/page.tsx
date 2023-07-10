import EventController from "@/services/controller/event";
import SessionController from "@/services/controller/session";
import SchedulePage from "./components/SchedulePage";
import StageController from "@/services/controller/stage";
import { FilterContextProvider } from "../archive/components/FilterContext";

export async function generateStaticParams() {
  const eventController = new EventController();
  const allEvents = await eventController.getAllEvents();
  const paths = allEvents.map((event) => {
    return {
      params: {
        organization: event.organizationId,
        event: event.id,
      },
    };
  });
  return paths;
}

const EventPage = async ({
  params,
}: {
  children: React.ReactNode;
  params: {
    organization: string;
    event: string;
  };
}) => {
  const eventController = new EventController();
  const event = await eventController.getEvent(
    params.event,
    params.organization
  );
  const sessionController = new SessionController();
  const sessions = await sessionController.getAllSessionsForEvent(event.id);
  const stageController = new StageController();
  const stages = await stageController.getAllStagesForEvent(event.id);
  return (
    <FilterContextProvider items={sessions.map((session) => session.toJson())}>
      <div className="w-full h-full relative">
        <SchedulePage
          stages={stages.map((stage) => stage.toJson())}
          event={event.toJson()}
        />
      </div>
    </FilterContextProvider>
  );
};

export default EventPage;
