import { ReactNode } from 'react'
import { EventContextProvider } from 'context/event-context'
import { Event, Stage, Session } from 'types'

interface Props {
  event?: Event
  stage: Stage | null
  sessions: Session[] | null
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

  const sessions = props.sessions

  if (!sessions) {
    return (
      <div>
        Sessions not properly configured. Please <a href="https://github.com/efdevcon/streameth">read the docs</a> to configure your event website.
      </div>
    )
  }


  return (
    <EventContextProvider event={props.event} activeStage={activeStage} sessions={sessions}>
      {props.children}
    </EventContextProvider>
  )
}
