import { useContext } from 'react'
import { EventContext } from 'context/event-context'
import { Stage } from 'types'

export function useStage(): Stage {
  const context = useContext(EventContext)
  console.log(context)

  if (context === undefined) {
    throw new Error('useStage must be used within an EventContextProvider')
  }

  return context.activeStage
}
