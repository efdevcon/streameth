import { DataConfig } from './config'

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
  stages: Stage[]
  data: DataConfig
}

export type SessionStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED'

export interface Session {
  id: string
  name: string
  //abstract?: string
  description: string
  gpt_description?: string
  track?: string
  //type?: string
  stage: Stage
  start: number
  end: number
  speakers: Speaker[]
  video?: string
  status?: SessionStatus
}

export interface Speaker {
  id: string
  name: string
  description: string
  avatar?: string
  avatarUrl?: string
}

export interface StreamId {
  id: string
}

export interface Stage {
  id: string
  name: string
  stream: StreamId
  image?: string
}

export type VideoTypes = 'youtube' | 'ipfs' | 'livepeer'
export interface Video {
  id?: string
  src?: string
  type: VideoTypes
}

export interface Filter {
  type: 'stage' | 'day' | 'track' | 'recording' | 'speaker' | 'time'
  value: any
}

export interface PossibleFilter {
  type: Filter['type']
  value: any[]
}

export type TimeState = 'BEFORE_EVENT' | 'DURING_DAY' | 'BEFORE_NEXT_DAY' | 'AFTER_EVENT'

export interface page {
  name: string
  href: string
}
