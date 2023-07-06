import EventController from "@/services/controller/event";
import EventList from "@/app/(home)/components/EventList";
import FilterBar from "./components/FilterBar";
import { FilterContextProvider } from "@/app/[organization]/[event]/archive/components/FilterContext";
export default async function Home() {
  const eventController = new EventController();
  const allEvents = (await eventController.getAllEvents()).map((event) => {
    return event.toJson();
  });

  return (
    <FilterContextProvider items={allEvents}>
      <main className="flex flex-col h-screen w-screen max-w-screen-xl overflow-y-auto m-auto">
        <FilterBar events={allEvents} />
        <EventList />
      </main>
    </FilterContextProvider>
  );
}
