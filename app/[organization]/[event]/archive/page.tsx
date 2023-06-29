import FilterBar from "./components/FilterBar";
import FilteredItems from "./components/FilteredItems";
import { FilterContextProvider } from "./components/FilterContext";
import SpeakerController from "@/services/controller/speaker";
import SessionController from "@/services/controller/session";
import StageController from "@/services/controller/stage";

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

  const speakerController = new SpeakerController();
  const speakers = (
    await speakerController.getAllSpeakersForEvent(params.event)
  ).map((speaker) => {
    return speaker.toJson();
  });

  const stageController = new StageController();
  const stages = (await stageController.getAllStagesForEvent(params.event)).map(
    (stage) => {
      return stage.toJson();
    }
  );

  return (
    <div className="flex flex-col-reverse lg:flex-row w-full overflow-y-hidden">
      <FilterContextProvider items={sessions}>
        <div className="w-full   p-4 overflow-y-scroll">
          <FilteredItems />
        </div>
        <div className="w-full lg:w-1/3 lg:max-w-[25rem]">
          <FilterBar sessions={sessions} speakers={speakers} stages={stages} />
        </div>
      </FilterContextProvider>
    </div>
  );
}
