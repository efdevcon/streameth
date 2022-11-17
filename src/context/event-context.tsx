import React, { createContext, ReactNode } from 'react'
import { Event, Stage, Session } from 'types'

interface ContextType {
  event: Event
  activeStage?: Stage
  sessions?: Session[]
}

interface Props extends ContextType {
  children: ReactNode
}

export const EventContext = createContext<ContextType | undefined>(undefined)

export function EventContextProvider(props: Props) {
  return <EventContext.Provider value={{ ...props }}>{props.children}</EventContext.Provider>
}
