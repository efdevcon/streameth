"use client";
import React, { useContext } from "react";
import { FilterContext, FilterOption } from "./FilterContext";

interface FilterProps {
  filterOptions: FilterOption[];
  filterName: string;
}

const SelectFilter = ({ filterOptions, filterName }: FilterProps) => {
  const { setFilterOptions } = useContext(FilterContext);

  const handleOptionSelect = (filterOption: FilterOption) => {
    if (filterOption === undefined) {
      setFilterOptions([]);
      return;
    }
    setFilterOptions([filterOption]);
  };

  return (
    <div className="flex flex-col justify-between mb-4">
      <div className="relative">
        <select
          onChange={(e) =>
            handleOptionSelect(
              filterOptions.find((option) => option.value === e.target.value)!
            )
          }
          className="p-2 h-12 border w-full rounded bg-primary border-secondary text-secondary placeholder:text-secondary placeholder:text-sm"
        >
          <option
            value=""
            className=""
          >{`Select ${filterName}`}</option>
          {filterOptions.map((option, index) => (
            <option
              key={index}
              className="cursor-pointer py-1"
              value={option.value}
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectFilter;
