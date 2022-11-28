import { useContext } from 'react'
import { PageContext } from 'context/page-context'
import { Stage } from 'types'

export function useStage(): Stage {
  const context = useContext(PageContext)

  if (context === undefined) {
    throw new Error('useStage must be used within an EventContextProvider')
  }

  if (!context.activeStage) {
    throw new Error('No stage found')
  }

  return context.activeStage
}
