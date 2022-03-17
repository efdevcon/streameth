export interface Event {
    id: string
    name: string
    description: string
    start: string
    end: string
    website: string
    stream: Stream
    schedule: Schedule
}

export interface Stream {
    // Pablo 
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