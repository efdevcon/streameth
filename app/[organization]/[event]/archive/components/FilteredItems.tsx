"use client"
import { useContext } from "react";
import { FilterContext } from "./FilterContext";
import SessionSnack from "@/components/sessions/SessionSnack";

const FilteredItems = () => {

  const { filteredItems } = useContext(FilterContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredItems.map((session) => {
        return <SessionSnack key={session.id} session={session} learnMore />;
      })}
    </div>
  );




}

export default FilteredItems;