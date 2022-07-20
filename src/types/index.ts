import { Stream, Schedule, Archive } from './config'

// TODO: Might be good to keep track of event state at a higher level 
// TODO: Same for stage state. E.g. which rooms/stages have ended and should go to archive functions
// e.g.
export type EventState = 'upcoming' | 'live' | 'started' | 'ended'

export interface Event {
  id: string
  version: number
  name: string
  description: string
  start: string
  end: string
  website: string
  imageUrl: string
  stream: Stream
  schedule: Schedule
  archive: Archive
}

export interface Session {
  id: string
  name: string
  abstract: string
  description: string
  track: string
  start: number
  end: number
  stage: string
  speakers: Speaker[]
}

export interface Speaker {
  id: string
  name: string
  description: string
  sessions: Session[]
}

export interface Stage {
  id: string
  name: string
  stream: string | string[]
}

export interface Video {
  id: string // hash
  slug: string // filename
  url: string
  session?: Session
}
