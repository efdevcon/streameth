import { promises as fs } from 'fs'
import path from 'path'
import PQueue from 'p-queue'
import fetch from 'node-fetch'
import moment from 'moment'
import { Session, Speaker, Stage } from 'types' // Update the import path to the actual 'types' file

const API_QUEUE = new PQueue({ concurrency: 1, interval: 1500 })

async function fetchApi(endpoint: string) {
  const response: any = await API_QUEUE.add(() => fetch(endpoint))
  if (!response.ok) {
    throw new Error(`API call failed with status ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

async function createLocalJsonCache(data: any, filename: string) {
  const cachePath = path.join(process.cwd(), 'cache')
  await fs.mkdir(cachePath, { recursive: true })
  await fs.writeFile(path.join(cachePath, `${filename}.json`), JSON.stringify(data))
}

async function getLocalJsonCache(filename: string) {
  const cachePath = path.join(process.cwd(), 'cache')
  const cacheFile = path.join(cachePath, `${filename}.json`)

  try {
    const cacheData = await fs.readFile(cacheFile, 'utf8')
    return JSON.parse(cacheData)
  } catch (err: any) {
    if (err.code === 'ENOENT') return null
    throw err
  }
}

export async function GetStages(): Promise<Stage[]> {
  const cache = await getLocalJsonCache('stages')
  if (cache) {
    return cache
  }
  const response = await fetchApi('https://zuzalu.city/api/fetchLocations')
  const stages: Stage[] = response.map((location: any) => {
    return {
      id: location.id.toString(),
      name: location.location,
    }
  })
  await createLocalJsonCache(stages, 'stages')
  return stages
}

async function fetchSession(sessionId: number): Promise<Session> {
  const cache = await getLocalJsonCache(`session-${sessionId}`)
  if (cache) {
    return cache
  }

  const response = await fetchApi(`https://zuzalu.city/api/fetchSession/${sessionId}`)
  const session = response.session
  const timeToAdd = session?.duration ? session?.duration : 60
  const data: Session = {
    id: session.id.toString(),
    name: session.name,
    description: session.description,
    //track: session.track,
    stage: await GetStages().then((stages) => {
      return (
        stages.find((stage) => {
          return stage.name === session.location
        }) || { id: '0', name: 'Unknown', stream: [{ id: '' }] }
      )
    }),
    start: moment(`${session.startDate} ${session.startTime}`).valueOf(),
    end: moment(`${session.startDate} ${session.startTime}`).add(timeToAdd, 'minutes').valueOf(),
    speakers: session.team_members?.map((speaker: any) => {
      return {
        id: speaker.name,
        name: speaker.name,
      }
    }),
    //video: session.video,
  }
  await createLocalJsonCache(data, `session-${sessionId}`)
  return data
}

export async function GetSessions(): Promise<Session[]> {
  let sessions: any[]
  const cache = await getLocalJsonCache('sessions')
  if (!cache) {
    sessions = await fetchApi('https://zuzalu.city/api/fetchSessions')
    await createLocalJsonCache(sessions, 'sessions')
  } else {
    sessions = cache
  }
  const fetchedSessions: Session[] = await Promise.all(
    sessions.map(async (session: any) => {
      return await fetchSession(session.id)
    })
  )
  return fetchedSessions
}

export async function GetSpeakers(): Promise<Speaker[]> {
  const sessions = await GetSessions()
  const speakers = sessions.flatMap((session) => session.speakers)
  // Remove duplicates
  return speakers.filter((speaker, index) => {
    return speakers.findIndex((s) => s.id === speaker.id) === index
  })
}

export async function GetSchedule(): Promise<Session[]> {
  return GetSessions()
}
