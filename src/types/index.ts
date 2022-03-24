export interface Event {
  id: string
  name: string
  description: string
  start: string
  end: string
  website: string
  stream: Stream
  schedule: Schedule
  streams: Array<Stream>
}

export interface Stream {
  // Pablo
  id: string
  order?: number // denotes stream importance (e.g. primary vs backup stream)
  name?: string
  isActive: boolean
  playbackUrl: string
}

export interface StreamProvider {
  getStreams: () => Promise<Array<Stream>>
  getStream: (streamId: string) => Promise<Stream | null>
  mapStreamObj: (data: any) => Stream
}

export interface Schedule {
  sessions: Session[]
}

export interface Session {
  id: string
  name: string
  abstract: string
  description: string
  track: string
  start: string
  end: string
  room: string
  speakers: Speaker[]
  tags: string[]
}

export interface Speaker {
  id: string
  name: string
  description: string
  sessions: Session[]
}
