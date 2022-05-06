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
  recordings: Recording[]
  archive: Archive
}

export interface Stream {
  id: string
  name?: string
  isActive: boolean
  playbackUrl: string
  // recordings: Recording[]
}

export interface Recording {
  name?: string
  recordingUrl: string
}

export interface Archive { 
  type: "ipfs",
  config: IpfsArchive
}

export interface IpfsArchive {
  directory: string
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

export interface Video {
  id: string // hash
  slug: string // filename
  url: string
  session?: Session
}