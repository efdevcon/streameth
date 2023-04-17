import React from 'react'
import Container from 'components/Container'
import FilterNavigation from './FilterNavigation'
import SessionSnack from 'components/Session/Snack'
import { useSessions } from 'hooks/useSessions'
import { PageContainer } from 'components/Container'
export default function SessionComponent() {
  const { sessions, addOrUpdateFilter, filters, possibleFilters } = useSessions()

  return (
    <PageContainer>
      <div className="flex flex-col h-full relative">
        <FilterNavigation title={'Archive'} possibleFilters={possibleFilters} onItemSelect={addOrUpdateFilter} selectedItems={filters} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 px-4 lg:px-8 overflow-scroll">
              {sessions.map((session) => (
                <SessionSnack key={session.id} session={session} learnMore />
              ))}
          </div>
      </div>
    </PageContainer>
  )
}
