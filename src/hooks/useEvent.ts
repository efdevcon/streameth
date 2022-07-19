import { useContext } from 'react'
import { EventContext } from 'context/event-context'
import { Event } from 'types'

export function useEvent(): Event {
    const context = useContext(EventContext)

    if (context === undefined) {
        throw new Error('useEvent must be used within an EventContextProvider')
    }
    if (context.event === undefined) {
        throw new Error('event not properly configured')
    }

    return context.event
}
