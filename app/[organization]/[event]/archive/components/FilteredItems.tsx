"use client"
import { useContext } from "react";
import { FilterContext } from "./FilterContext";
import ArchivedSession from "./ArchivedSession";
import { ISession } from "@/server/model/session";

const FilteredItems = () => {

  const { filteredItems } = useContext(FilterContext);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredItems.map((session: ISession) => {
        return <ArchivedSession session={session} key={session.id} learnMore />;
      })}
    </div>
  );




}

export default FilteredItems;