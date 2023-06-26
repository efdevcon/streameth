import SpeakerController from "@/services/controller/speaker";
import SessionController from "@/services/controller/session";
import StageController from "@/services/controller/stage";

import SearchFilter from "./SearchFilter";
import SelectFilter from "./SelectFilter";
import NavigationBarWrapper from "./NavigationBarWrapper";

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
      new Set(sessions.map((session) => session.start.toLocaleDateString()))
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
    <NavigationBarWrapper>
      <div className="md:flex flex-col w-full relative p-4 ">
        <p className="text-lg my-2 font-light text-secondary">Search</p>
        <SearchFilter
          index={2}
          filterOptions={sessionFilters}
          filterName="session name"
        />
        <SearchFilter
          index={1}
          filterOptions={speakerFilters}
          filterName="speaker"
        />
        <p className="text-lg my-2 font-light text-secondary">More filters</p>
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
        <SelectFilter
          index={3}
          filterOptions={trackFilter}
          filterName="Track"
        />
      </div>
    </NavigationBarWrapper>
  );
}
