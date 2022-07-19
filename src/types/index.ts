import { Stream, Schedule, Archive } from './config'

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
  start: string
  end: string
  stage: string
  speakers: Speaker[]
  tags: string[]
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
