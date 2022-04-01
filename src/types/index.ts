export interface Event {
  id: string
  name: string
  description: string
  start: string
  end: string
  website: string
  poster: string
  stream: Stream
  schedule: Schedule
  rooms: Room[]
}

export interface Stream {
  // Pablo
  id: string
  name?: string
  isActive: boolean
  playbackUrl: string
  recordings: Recording[]
}

// stream recording
export interface Recording {
  id: string
  recordingUrl: string
}

export interface StreamProvider {
  getStreams: (ids: string[]) => Promise<Stream[]>
  getStream: (streamId: string) => Promise<Stream>
  getRecordings: (streamId: string) => Promise<Recording[]>
  mapStreamObj: (data: any) => Stream
  mapRecordingObj: (data: any) => Recording
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

export interface Room {
  id: string // e.g. Main
  streams: Stream[]
}
