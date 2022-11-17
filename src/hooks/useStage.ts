import { useContext } from 'react'
import { EventContext } from 'context/event-context'
import { Stage } from 'types'

export function useStage(): Stage {
  const context = useContext(EventContext)

  if (context === undefined) {
    throw new Error('useStage must be used within an EventContextProvider')
  }

  if (!context.activeStage) {
    throw new Error('No stage found')
  }

  return context.activeStage
}
