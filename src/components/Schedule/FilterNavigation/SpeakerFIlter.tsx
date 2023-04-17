import { PossibleFilter, Filter } from 'types'
import {useMemo, useState, useCallback} from 'react'

export default function SpeakerFilterItem({
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
    <div className="flex flex-col justify-between p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Filter by speaker"
          value={speakerFilter}
          onChange={(e) => setSpeakerFilter(e.target.value)}
          className="p-2 border-2  bg-black border-black h-12 text-white placeholder:text-white"
        />
        {speakerFilter && (
          <div className="absolute top-full left-0 z-10 bg-white border rounded-b-md shadow-md max-h-40 w-full overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className=" py-1">No options found</div>
            ) : (
              filteredOptions.map((option, index) => (
                <div key={index} className="cursor-pointer py-1 g-white dark:hover:bg-gray-800" onClick={() => handleSpeakerSelect(option)}>
                  {option}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="flex flex-row flex-wrap">
        {selectedSpeakerOptions.map((option, index) => (
          <div
            key={`${option}-${index}`}
            className="cursor-pointer p-1 m-1 border-2 border-black text-sm font-light text-white bg-black"
            onClick={() => onItemSelect({ type: 'speaker', value: option })}>
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}
