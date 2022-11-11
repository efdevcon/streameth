import { Session, Stage } from 'types'

export interface Config {
  [key: string]: string | boolean | number | Array<Config>
}

export type StreamTypes = 'livepeer'
export interface Stream {
  id: string
  version: number
  type: StreamTypes
  stages: Stage[]
  config: Config
}

export type ScheduleTypes = 'fs' | 'pretalx' | 'gsheet'
export interface Schedule {
  version: number
  type: ScheduleTypes
  config: Config
  sessions: Session[]
}

export type ArchiveTypes = 'gsheet'
export interface Archive {
  version: number
  type: ArchiveTypes
  config: Config
  sessions: Session[]
}
