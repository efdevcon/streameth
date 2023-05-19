import React, { useEffect } from 'react'
import FilterNavigation from './FilterNavigation'
import SessionSnack from 'components/Session/Snack'
import { useSessions } from 'hooks/useSessions'
import { PageContainer } from 'components/Container'

export default function SessionComponent() {
  const { sessions, addOrUpdateFilter, filters, possibleFilters, removeFilter } = useSessions()
  const [isLoading, setIsLoading] = React.useState(true)
  useEffect(() => {
    addOrUpdateFilter({
      type: 'recording',
      value: 'yes',
    })
    setIsLoading(false)
  }, [])

  return (
    <div className="flex flex-col h-full relative">
      <FilterNavigation removeFilter={removeFilter} possibleFilters={possibleFilters} onItemSelect={addOrUpdateFilter} selectedItems={filters} />
      {sessions.length === 0 && !isLoading && (
        <div className="m-auto flex h-full w-full">
          <p className="m-auto">No sessions have been uploaded yet</p>
        </div>
      )}
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4  overflow-scroll">
          {isLoading && <div>Loading...</div>}
          {!isLoading && sessions.map((session) => <SessionSnack key={session.id} session={session} learnMore />)}
        </div>
      </PageContainer>
    </div>
  )
}
