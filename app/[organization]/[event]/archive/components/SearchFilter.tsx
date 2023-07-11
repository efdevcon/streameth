"use client";
import { useState, useContext, useEffect } from "react";
import { FilterContext, FilterOption } from "./FilterContext";
import Session from "@/server/model/session";
interface FilterProps<T> {
  filterOptions: FilterOption<T>[];
  filterName: string;
}

const SearchFilter = <T extends object>({
  filterOptions,
  filterName,
}: FilterProps<T>) => {
  const { setFilterOptions, filterOptions: currentFilterOptions } =
    useContext(FilterContext);
  const [selectedItems, setSelectedItems] = useState<FilterOption<T>[]>([]);
  const [filterInput, setFilterInput] = useState<string>("");

  const filteredOptions = () => {
    if (filterInput === "") {
      return filterOptions;
    }
    return filterOptions.filter((option) =>
      option.name.toLowerCase().includes(filterInput.toLowerCase())
    );
  };

  useEffect(() => {
    // current filter options to selected items
    currentFilterOptions.filter((option) => {
      console.log(option);
      if (!selectedItems.includes(option) && option.type == filterOptions[0].type) {
        setSelectedItems([...selectedItems, option]);
      }
    });
  }, []);

  const handleOptionSelect = (option: FilterOption<T>) => {
    setSelectedItems([...selectedItems, option]);
    setFilterInput("");
    setFilterOptions([...currentFilterOptions, option]);
  };

  const handleOptionRemove = (option: FilterOption<T>) => {
    setSelectedItems(selectedItems.filter((item) => item.name !== option.name));
    setFilterOptions(
      currentFilterOptions.filter((item) => item.name !== option.name)
    );
  };

  return (
    <div className="flex flex-col justify-between font-light mb-2 w-full">
      <div className="relative">
        <input
          type="text"
          placeholder={` ${filterName}`}
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          className="p-2 h-12 border w-full rounded bg-primary text-main-text placeholder:text-main-text placeholder:text-sm"
        />
        {filterInput && (
          <div className="absolute top-fullborder rounded-b-md shadow-md left-0 z-10 bg-primary  max-h-40 w-full overflow-auto">
            {filteredOptions().length === 0 ? (
              <div className=" py-1">{`No ${filterName} found`}</div>
            ) : (
              filteredOptions().map((option, index) => (
                <div
                  key={index}
                  className="cursor-pointer py-1"
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
            key={`${option.name}-${index}`}
            className="cursor-pointer p-1 m-1 border-2 border-accent text-sm font-light text-white bg-accent opacity-80"
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
