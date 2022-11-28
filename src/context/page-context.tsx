
import React, { createContext, ReactNode } from 'react'
import { Speaker, Stage, Session } from 'types'

interface ContextType {
  stage?: Stage
  speaker?: Speaker
  session?: Session
  stages?: Stage[]
  sessions?: Session[]
  speakers?: Speaker[]
}

interface Props extends ContextType {
  children: ReactNode
}

export const PageContext = createContext<ContextType | undefined>(undefined)

export function PageContextProvider(props: Props) {
  return <PageContext.Provider value={{ ...props }}>{props.children}</PageContext.Provider>
}
