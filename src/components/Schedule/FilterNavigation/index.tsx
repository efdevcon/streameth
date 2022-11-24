import React from 'react'
import { PossibleFilter, Filter } from 'types'
import Calendar from 'assets/images/calendar.svg'
import {getDate} from 'utils/dateTime'
interface Props {
  possibleFilters: PossibleFilter[]
  onItemSelect: (filter: Filter) => void
  selectedItems: Filter[]
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

  const isSelected = (item: Filter['value']) => selectedItems.some((selectedItem) => selectedItem.value === item)
  return (
    <div className="flex flex-col justify-between my-5">
      <div className="text-xl font-normal dark:text-gray-200">{type}</div>
      <div className="flex flex-row flex-wrap p-2">
        {value?.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer p-1 m-1 border-2 rounded text-sm font-light dark:text-gray-200 ${isSelected(item) && 'bg-gray-200 dark:bg-gray-800'}`}
            onClick={() => onItemSelect({ type, value: item })}>
            {type === "day" ? getDate(item) : item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FilterNavigation(props: Props) {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
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
        <div className="overflow-auto w-full sm:w-2/4 lg:w-1/4 h-full fixed z-50 px-6 py-14 border-r-slate-200 sm:border-r-2 bg-white dark:bg-black">
          <div onClick={() => setIsOpen(false)} className="absolute p-5 right-0 top-0 lg:hidden text-2xl font-bold cursor-pointer">
            x
          </div>
          <div className="text-3xl lg:text-4xl xl:text-4xl dark:text-white">Filter</div>
          <div>
            {props.possibleFilters.map((possibleFilter) => (
              <FilterNavigationItem
                key={possibleFilter.type}
                possibleFilter={possibleFilter}
                onItemSelect={props.onItemSelect}
                selectedItems={props.selectedItems}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="flex h-16 bg-slate-200 rounded-r-lg px-2 cursor-pointer absolute items-center lg:hidden"
          onClick={() => {
            setIsOpen(true)
          }}>
          <Calendar />
        </div>
      )}
    </>
  )
}
