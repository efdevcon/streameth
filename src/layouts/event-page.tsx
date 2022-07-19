import { ReactNode } from "react"
import { EventContextProvider } from "context/event-context"
import { Event } from 'types'

interface Props {
    event?: Event
    stageId?: string
    children: ReactNode
}

export default function EventPage(props: Props) {
    if (!props.event) {
        return <div>
            Event not configured. Please <a href='https://github.com/efdevcon/streameth'>read the docs</a> to configure your event website.
        </div>
    }

    const activeStage = props.stageId ?
        props.event.stream.stages.find(i => i.id.toLowerCase() === props.stageId?.toLowerCase()) :
        props.event.stream.stages[0]

    if (!activeStage) {
        return <div>
            Stages not properly configured. Please <a href='https://github.com/efdevcon/streameth'>read the docs</a> to configure your event website.
        </div>
    }

    return <EventContextProvider event={props.event} activeStage={activeStage}>
        {props.children}
    </EventContextProvider>
}