import { ReactNode } from 'react'
import { EventContextProvider } from 'context/event-context'
import { Event, Stage } from 'types'

interface Props {
  event?: Event
  stageId?: string
  stage: Stage | null
  children: ReactNode
}

export default function EventPage(props: Props) {
  if (!props.event) {
    return (
      <div>
        Event not configured. Please <a href="https://github.com/efdevcon/streameth">read the docs</a> to configure your event website.
      </div>
    )
  }

  const activeStage = props.stage

  if (!activeStage) {
    return (
      <div>
        Stages not properly configured. Please <a href="https://github.com/efdevcon/streameth">read the docs</a> to configure your event website.
      </div>
    )
  }

  return (
    <EventContextProvider event={props.event} activeStage={activeStage}>
      {props.children}
    </EventContextProvider>
  )
}
