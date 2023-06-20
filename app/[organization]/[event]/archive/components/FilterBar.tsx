import SpeakerController from "@/services/controller/speaker";
import SessionController from "@/services/controller/session";
import StageController from "@/services/controller/stage";

import SearchFilter from "./SearchFilter";
import SelectFilter from "./SelectFilter";

export default async function FilterBar({ eventId }: { eventId: string }) {
  const speakerController = new SpeakerController();
  const speakers = await speakerController.getAllSpeakersForEvent(eventId);
  const speakerFilters = speakers.map((speaker) => {
    return {
      name: speaker.name,
      value: speaker.id,
      type: "speaker",
    };
  });

  const sessionController = new SessionController();
  const sessions = await sessionController.getAllSessionsForEvent(eventId);
  const sessionFilters = sessions.map((session) => {
    return {
      name: session.name,
      value: session.name,
      type: "name",
    };
  });

  const sessionDateFilters = () => {
    const uniqueDates = Array.from(
      new Set(sessions.map((session) => session.getSessionDate().start))
    );

    uniqueDates.sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });

    return uniqueDates.map((date) => ({
      name: date,
      value: date,
      type: "date",
    }));
  };

  const trackFilter = sessions.map((session) => {
    return {
      name: session.track,
      value: session.track,
      type: "track",
    };
  });

  const stageController = new StageController();
  const stages = await stageController.getAllStagesForEvent(eventId);
  const stageFilters = stages.map((stage) => {
    return {
      name: stage.name,
      value: stage.id,
      type: "stage",
    };
  });

  return (
    <>
      <div className="md:flex flex-row flex-wrap w-full relative bg-black opacity-75 p-4 items-center justify-center hidden">
        <SelectFilter
          index={0}
          filterOptions={stageFilters}
          filterName="Stage"
        />
        <SelectFilter
          index={1}
          filterOptions={sessionDateFilters()}
          filterName="Date"
        />
        <SearchFilter
          index={1}
          filterOptions={speakerFilters}
          filterName="Speaker"
        />
        <SearchFilter
          index={2}
          filterOptions={sessionFilters}
          filterName="Session name"
        />
        <SelectFilter
          index={3}
          filterOptions={trackFilter}
          filterName="Track"
        />
      </div>
      <div className="md:hidden flex flex-row flex-wrap w-full relative bg-black opacity-75 p-4 items-center justify-center">
        <SelectFilter
          index={0}
          filterOptions={stageFilters}
          filterName="Stage"
        />
        <SelectFilter
          index={1}
          filterOptions={sessionDateFilters()}
          filterName="Date"
        />
        <SearchFilter
          index={1}
          filterOptions={speakerFilters}
          filterName="Speaker"
        />
        <SearchFilter
          index={2}
          filterOptions={sessionFilters}
          filterName="Session name"
        />
        <SelectFilter
          index={3}
          filterOptions={trackFilter}
          filterName="Track"
        />
      </div>
    </>
  );
}
