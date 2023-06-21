import SessionController from "@/services/controller/session";
import NavigationBar from "./components/FilterBar";
import FilteredItems from "./components/FilteredItems";
import { FilterContextProvider } from "./components/FilterContext";
interface Params {
  params: {
    event: string;
  };
}

export default async function ArchivePage({ params }: Params) {
  const sessionController = new SessionController();
  const sessions = (
    await sessionController.getAllSessionsForEvent(params.event)
  ).map((session) => {
    return session.toJson();
  });

  return (
    <div className="flex flex-col-reverse lg:flex-row w-full overflow-y-hidden">
      <FilterContextProvider sessions={sessions}>
        <div className="w-full   p-4 overflow-y-scroll">
        <FilteredItems />
        </div>
        <div className="w-full lg:w-1/3 lg:max-w-[25rem]">
        <NavigationBar eventId={params.event} />
        </div>
      </FilterContextProvider>
    </div>
  );
}
