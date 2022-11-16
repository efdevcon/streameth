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
      <div>
        <FilterNavigation possibleFilters={possibleFilters} onItemSelect={addOrUpdateFilter} selectedItems={filters} />
      </div>
      <div className="lg:w-3/4 h-full overflow-y-auto ml-auto">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-4">
            {sessions.map((session) => (
              <SessionSnack key={session.id} session={session} learnMore />
            ))}
          </div>
        </Container>
      </div>
    </PageContainer>
  )
}
