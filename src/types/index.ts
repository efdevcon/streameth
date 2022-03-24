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
  recordings: Array<Recording>
}

// stream recording
export interface Recording {
  id: string
  recordingUrl: string
}

export interface StreamProvider {
  getStreams: () => Promise<Array<Stream>>
  getStream: (streamId: string) => Promise<Stream | null>
  getRecordings: (streamId: string) => Promise<Array<Recording>>
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
