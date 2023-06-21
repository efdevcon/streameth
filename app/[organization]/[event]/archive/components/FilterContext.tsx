"use client";
import React, {
  useState,
  createContext,
  useEffect,
  SetStateAction,
} from "react";
import {ISession} from "@/services/model/session";

export interface FilterOption {
  name: string;
  value: string;
  type: "stage" | "speaker" | "name" | "date" | "track";
}

const FilterContext = createContext<{
  sessions: ISession[];
  filteredSessions: ISession[];
  filterOptions: FilterOption[];
  setFilterOptions: React.Dispatch<SetStateAction<FilterOption[]>>;
}>({
  sessions: [],
  filteredSessions: [],
  filterOptions: [],
  setFilterOptions: () => {},
});


const FilterContextProvider = ({
  children,
  sessions,
}: {
  children: React.ReactNode;
  sessions: ISession[];
}) => {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<ISession[]>(sessions);

  const filterSessions = () => {
    let returnSessions: ISession[] = sessions;

    if (filterOptions.length > 0) {
      for (const filterOption of filterOptions) {
        returnSessions = returnSessions.filter((session) => {
          if (filterOption.type === "stage") {
            return session.stageId === filterOption.value;
          }
          if (filterOption.type === "speaker") {
            return session.speakers.some(
              (speaker) => speaker.id === filterOption.value
            );
          }
          if (filterOption.type === "name") {
            return session.name === filterOption.value;
          }
          if (filterOption.type === "date") {
            return session.start.toLocaleDateString() === filterOption.value;
          }
          if (filterOption.type === "track") {
            if (session.track !== undefined) {
              return session.track.some(
                (track) => track === filterOption.value
              );
            }
          }

          return false;
        });
      }
    }
    returnSessions = Array.from(new Set(returnSessions));
    setFilteredSessions(returnSessions);
  };

  useEffect(() => {
    console.log("filterOptions", filterOptions);
    filterSessions();
  }, [filterOptions]);

  useEffect(() => {
    console.log("sessions", sessions);
  }, [sessions]);

  return (
    <FilterContext.Provider
      value={{
        sessions,
        filteredSessions,
        filterOptions,
        setFilterOptions,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterContextProvider };
