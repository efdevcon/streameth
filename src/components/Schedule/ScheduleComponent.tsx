import React, { useEffect } from 'react'
import Container from 'components/Container'
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
    <PageContainer>
      <div className="flex flex-col h-full relative">
        <FilterNavigation removeFilter={removeFilter} possibleFilters={possibleFilters} onItemSelect={addOrUpdateFilter} selectedItems={filters} />
        {sessions.length === 0 && !isLoading && <div className="px-8 m-auto flex h-full w-full">
          <p className="m-auto">No sessions have been uploaded yet</p></div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 px-4 lg:px-8 overflow-scroll">
          {isLoading && <div>Loading...</div>}
          {!isLoading && sessions.map((session) => <SessionSnack key={session.id} session={session} learnMore />)}
        </div>
      </div>
    </PageContainer>
  )
}
