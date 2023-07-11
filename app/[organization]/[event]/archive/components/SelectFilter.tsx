"use client";
import React, { useContext } from "react";
import { FilterContext, FilterOption } from "./FilterContext";

interface FilterProps<T> {
  filterOptions: FilterOption<T>[];
  filterName: string;
}

const SelectFilter = <T extends object>({ filterOptions, filterName }: FilterProps<T>) => {
  const { setFilterOptions } = useContext(FilterContext);

  const handleOptionSelect = (filterOption: FilterOption<T>) => {
    if (filterOption === undefined) {
      setFilterOptions([]);
      return;
    }
    setFilterOptions([filterOption]);
  };

  return (
    <div className="flex flex-col justify-between mb-2 font-light">
      <div className="relative">
        <select
          onChange={(e) =>
            handleOptionSelect(
              filterOptions.find((option) => option.name === e.target.value)!
            )
          }
          className="p-2 h-12 border w-full rounded text-sm  bg-primary placeholder:text-sm"
        >
          <option
            value=""
            className="text-sm placeholder:text-sm"
          >{`Select ${filterName}`}</option>
          {filterOptions.map((option, index) => (
            <option
              key={index}
              className="cursor-pointer py-1"
              value={option.name}
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
