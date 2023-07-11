"use client";
import SearchFilter from "./SearchFilter";
import SelectFilter from "./SelectFilter";
import NavigationBarWrapper from "./NavigationBarWrapper";
import { ISession } from "@/server/model/session";
import { ISpeaker } from "@/server/model/speaker";
import { IStage } from "@/server/model/stage";

export default async function FilterBar({
  sessions,
  speakers,
  stages,
}: {
  sessions: ISession[];
  speakers: ISpeaker[];
  stages: IStage[];
}) {
  const speakerFilters = speakers.map((speaker) => {
    return {
      name: speaker.name,
      value: speaker.id,
      type: "speaker",
      filterFunc: async (item: ISession) => {
        return item.speakers.some((sessionSpeaker) => {
          return sessionSpeaker.id === speaker.id;
        });
      },
    };
  });

  const sessionFilters = sessions.map((session) => {
    return {
      name: session.name,
      value: session.name,
      type: "name",
      filterFunc: async (item: ISession) => {
        return item.name === session.name;
      },
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
      filterFunc: async (item: ISession) => {
        return item.start.toLocaleDateString() === date;
      },
    }));
  };

  const trackFilter = sessions.map((session) => {
    return {
      name: session.track,
      value: session.track,
      type: "track",
      filterFunc: async (item: ISession) => {
        return item.track === session.track;
      },
    };
  });

  const stageFilters = stages.map((stage) => {
    return {
      name: stage.name,
      value: stage.id,
      type: "stage",
      filterFunc: async (item: ISession) => {
        return item.stageId === stage.id;
      },
    };
  });

  return (
    <NavigationBarWrapper>
      <div className="md:flex flex-col w-full relative p-4 ">
        <p className="text-lg my-2 font-light text-secondary">Search</p>
        <SearchFilter
          filterOptions={sessionFilters}
          filterName="session name"
        />
        <SearchFilter filterOptions={speakerFilters} filterName="speaker" />
        <p className="text-lg my-2 font-light text-secondary">More filters</p>
        <SelectFilter filterOptions={stageFilters} filterName="Stage" />
        <SelectFilter filterOptions={sessionDateFilters()} filterName="Date" />
        {/* <SelectFilter filterOptions={trackFilter} filterName="Track" /> */}
      </div>
    </NavigationBarWrapper>
  );
}
