"use client";
import { useState, useContext } from "react";
import { FilterContext, FilterOption } from "./FilterContext";

interface FilterProps {
  filterOptions: FilterOption[];
  filterName: string;
}

const SearchFilter = ({ filterOptions, filterName }: FilterProps) => {
  const { setFilterOptions, filterOptions: currentFilterOptions } =
    useContext(FilterContext);
  const [selectedItems, setSelectedItems] = useState<FilterOption[]>([]);
  const [filterInput, setFilterInput] = useState<string>("");

  const filteredOptions = () => {
    if (filterInput === "") {
      return filterOptions;
    }
    return filterOptions.filter((option) =>
      option.value.toLowerCase().includes(filterInput.toLowerCase())
    );
  };

  const handleOptionSelect = (option: FilterOption) => {
    setSelectedItems([...selectedItems, option]);
    setFilterInput("");
    setFilterOptions([...currentFilterOptions, option]);
  };

  const handleOptionRemove = (option: FilterOption) => {
    setSelectedItems(
      selectedItems.filter((item) => item.value !== option.value)
    );
    setFilterOptions(
      currentFilterOptions.filter((item) => item.value !== option.value)
    );
  };

  return (
    <div className="flex flex-col justify-between p-4">
      <div className="relative">
        <input
          type="text"
          placeholder={`Search ${filterName}`}
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          className="p-2 border-2  bg-white border-white h-12 text-black placeholder:text-black"
        />
        {filterInput && (
          <div className="absolute top-full left-0 z-10 bg-white border rounded-b-md shadow-md max-h-40 w-full overflow-auto">
            {filteredOptions().length === 0 ? (
              <div className=" py-1">{`No ${filterName} found`}</div>
            ) : (
              filteredOptions().map((option, index) => (
                <div
                  key={index}
                  className="cursor-pointer py-1 g-white dark:hover:bg-gray-800"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.name}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap">
        {selectedItems.map((option, index) => (
          <div
            key={`${option}-${index}`}
            className="cursor-pointer p-1 m-1 border-2 border-black text-sm font-light text-white bg-black opacity-80"
            onClick={() => handleOptionRemove(option)}
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
