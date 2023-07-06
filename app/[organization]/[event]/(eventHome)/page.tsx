import EventController from "@/services/controller/event";
import SessionController from "@/services/controller/session";
import SchedulePage from "./components/SchedulePage";
import StageController from "@/services/controller/stage";
import { FilterContextProvider } from "../archive/components/FilterContext";
import Filter from "./components/Filter";
import Image from "next/image";


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
      <div className="w-full h-full">
        {/* <div className=" w-full relative flex flex-row justify-center items-center bg-primary bg-opacity-80">
          <Image
            src={event.eventCover ?? ""}
            fill
            alt="cover"
            className="bg-opacity-80"
          />
          <div className=" z-50 bg-base p-4 glass-style overflow-hidden text-center">
            <h1 className="text-2xl font-bold text-main-text">{event.name}</h1>
            <p className="text-secondary-text text-lg p-4">
              {event.description}
            </p>
          </div>
        </div> */}
        <Filter event={event.toJson()} />
        <SchedulePage stages={stages.map((stage) => stage.toJson())} />
      </div>
    </FilterContextProvider>
  );
};

export default EventPage;
