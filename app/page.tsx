import EventController from "@/services/controller/event";
import EventCard from "@/components/events/EventCard";
import SearchFilter from "./[organization]/[event]/archive/components/SearchFilter";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { FilterContextProvider } from "./[organization]/[event]/archive/components/FilterContext";
export default async function Home() {
  const eventController = new EventController();
  const allEvents = await eventController.getAllEvents();
  const eventFilter = allEvents.map((event) => {
    return {
      name: event.name,
      value: event.id,
      type: "event",
    };
  });

  return (
    <main className="flex flex-col min-h-screen w-screen p-4 items-center">
      <div className="flex flex-col space-y-4 w-full max-w-screen-lg">
        <div className="w-full flex flex-row items-center">
          <h1 className="text-2xl text-main-text font-bold">Upcoming events</h1>
          <div className="w-80 ml-auto">
            <SearchFilter filterOptions={eventFilter} filterName="Event" />
          </div>
        </div>
        <div className="w-full h-80 bg-primary rounded">
          <div className="flex flex-col items-center justify-center h-full">
            <CalendarDaysIcon className="h-20 w-20 text-secondary" />
            <p className="text-accent">No upcoming events</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl text-main-text font-bold text-center">
          Past events
        </h1>
        <div className="flex flex-row items-center justify-center space-x-4">
          {allEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}
