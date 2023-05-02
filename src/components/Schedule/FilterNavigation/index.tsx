import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { PossibleFilter, Filter } from 'types'
import { getDate } from 'utils/dateTime'

function SpeakerFilterItem({
  options,
  selectedItems,
  onItemSelect,
}: {
  options: string[]
  selectedItems: Filter[]
  onItemSelect: (filter: Filter) => void
}) {
  const [speakerFilter, setSpeakerFilter] = useState('')

  const filteredOptions = useMemo(
    () =>
      options.filter(
        (option) =>
          speakerFilter !== '' && option.toLowerCase().includes(speakerFilter.toLowerCase()) && !selectedItems.some((item) => item.value === option)
      ),
    [options, selectedItems, speakerFilter]
  )

  const selectedSpeakerOptions = useMemo(() => selectedItems.filter((item) => item.type === 'speaker').map((item) => item.value), [selectedItems])

  const handleSpeakerSelect = useCallback(
    (speaker) => {
      onItemSelect({ type: 'speaker', value: speaker })
      setSpeakerFilter('')
    },
    [onItemSelect]
  )

  return (
    <div className="flex flex-col justify-between my-5">
      <div className="text-xl font-normal dark:text-gray-200">Speaker</div>

      <div className="relative">
        <input
          type="text"
          placeholder="Filter by speaker"
          value={speakerFilter}
          onChange={(e) => setSpeakerFilter(e.target.value)}
          className="p-1 rounded border-2 text-sm font-light w-full my-2"
        />
        {speakerFilter && (
          <div className="absolute top-full left-0 z-10 p-2 bg-white border border-gray-300 rounded-b-md shadow-md dark:bg-black dark:border-gray-600 max-h-40 w-full overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="text-gray-500 dark:text-gray-400 py-1">No options found</div>
            ) : (
              filteredOptions.map((option, index) => (
                <div key={index} className="cursor-pointer py-1 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleSpeakerSelect(option)}>
                  {option}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="flex flex-row flex-wrap p-2">
        {selectedSpeakerOptions.map((option, index) => (
          <div
            key={`${option}-${index}`}
            className="cursor-pointer p-1 m-1 border-2 rounded text-sm font-light dark:text-gray-200 bg-gray-200 dark:bg-gray-800"
            onClick={() => onItemSelect({ type: 'speaker', value: option })}>
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

function FilterNavigationItem({
  possibleFilter,
  onItemSelect,
  selectedItems,
}: {
  possibleFilter: PossibleFilter
  onItemSelect: (filter: Filter) => void
  selectedItems: Filter[]
}) {
  const { type, value } = possibleFilter

  const isSelected = (item: string) => selectedItems.some((selectedItem) => selectedItem.value === item)

  if (type === 'speaker') {
    return <SpeakerFilterItem options={value} selectedItems={selectedItems} onItemSelect={onItemSelect} />
  }

  return (
    <div className="flex flex-col justify-between my-5 box-content">
      <div className="text-xl font-normal dark:text-gray-200">{type}</div>
      <div className="flex flex-row flex-wrap p-2">
        {value?.map((item, index) => (
          <div
            key={`${type}-${item}-${index}`}
            className={`cursor-pointer p-1 m-1 border-2 rounded text-sm font-light dark:text-gray-200 ${
              isSelected(item) && 'bg-gray-200 dark:bg-gray-800'
            }`}
            onClick={() => onItemSelect({ type, value: item })}>
            {type === 'day' ? getDate(item) : item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FilterNavigation({
  possibleFilters,
  onItemSelect,
  selectedItems,
  title,
}: {
  possibleFilters: PossibleFilter[]
  onItemSelect: (filter: Filter) => void
  selectedItems: Filter[]
  title?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setIsOpen(window.innerWidth > 1024)
      }
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {isOpen ? (
        <div className="overflow-auto w-full sm:w-2/4 lg:w-1/4 h-full fixed lg:relative  z-50 p-5 border-r-slate-200 sm:border-r-2 bg-white dark:bg-black">
          <div onClick={() => setIsOpen(false)} className="absolute p-5 right-0 top-0 lg:hidden text-2xl font-bold cursor-pointer">
            x
          </div>
          {title && <div className="text-3xl lg:text-4xl xl:text-4xl dark:text-white">{title}</div>}
          <div>
            {possibleFilters.map((possibleFilter) => (
              <FilterNavigationItem
                key={possibleFilter.type}
                possibleFilter={possibleFilter}
                onItemSelect={onItemSelect}
                selectedItems={selectedItems}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex p-5 cursor-pointer items-center lg:hidden" onClick={() => setIsOpen(true)}>
          {title && <div className="text-3xl lg:text-4xl xl:text-4xl dark:text-white">{title}</div>}
          <span className="ml-auto">filter</span>
        </div>
      )}
    </>
  )
}
