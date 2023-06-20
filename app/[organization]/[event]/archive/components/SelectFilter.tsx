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
    setFilterOptions([filterOption]);
  };

  return (
    <div className="flex flex-col justify-between p-4">
      <div className="relative">
        <select
          onChange={(e) =>
            handleOptionSelect(
              filterOptions.find((option) => option.value === e.target.value)!
            )
          }
          className="p-2 border-2  bg-white border-white h-12 text-black placeholder:text-white "
        >
          <option value="">{`Select ${filterName}`}</option>
          {filterOptions.map((option, index) => (
            <option
              key={index}
              className="cursor-pointer py-1 g-white dark:hover:bg-gray-800"
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
