import SessionController from "@/services/controller/session";
import SessionSnack from "@/components/sessions/SessionSnack";
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
  const sessions = await sessionController.getAllSessionsForEvent(params.event);

  return (
    <div className="flex flex-col overflow-y-hidden">
      <FilterContextProvider sessions={sessions}>
        <NavigationBar eventId={params.event} />
       <FilteredItems />
      </FilterContextProvider>
    </div>
  );
}
