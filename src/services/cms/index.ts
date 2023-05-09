import fs from 'fs'
import { Session, Speaker, Stage } from 'types'
import matter from 'gray-matter'
import { datetimeToUnixTimestamp } from 'utils/dateTime'

interface RawSessionData {
  id: string
  name: string
  description: string
  stage: string
  start: string
  end: string
  speakers: { id: string }[]
  video?: any
}

interface RawSpeakerData {
  id: string
  name: string
  description: string
  avatar?: string
  avatarUrl?: string
}

interface RawStageData {
  id: string
  name: string
  stream: { id: string }[]
  image?: string
}

const cmsStageContentPath = 'content/stages'

export async function GetStages(): Promise<Stage[]> {
  const filesInStages = fs.readdirSync(cmsStageContentPath)
  return filesInStages.map((file) => {
    const filename = file.slice(0, file.indexOf('.'))
    const data = matter(fs.readFileSync(`${cmsStageContentPath}/${filename}.md`, 'utf8'))
    const rawStageData = data.data as RawStageData
    return {
      id: rawStageData.id,
      name: rawStageData.name,
      stream: rawStageData.stream[0],
      image: rawStageData.image,
    }
  })
}

const cmsSessionContentPath = 'content/sessions'
export async function GetSchedule(): Promise<Session[]> {
  const filesInProjects = fs.readdirSync(cmsSessionContentPath)

  const allSpeakers = await GetSpeakers()
  const allStages = await GetStages()
  return filesInProjects.map((file) => {
    const filename = file.slice(0, file.indexOf('.'))
    const data = matter(fs.readFileSync(`${cmsSessionContentPath}/${filename}.md`, 'utf8'))
    const rawSession = data.data as RawSessionData
    return {
      id: rawSession.id,
      name: rawSession.name,
      description: rawSession.description,
      stage: findStageForSession(rawSession.stage, allStages),
      start: datetimeToUnixTimestamp(rawSession.start),
      end: datetimeToUnixTimestamp(rawSession.end),
      speakers: findSpeakerForSession(rawSession.speakers, allSpeakers),
      video: rawSession.video ?? null,
    }
  })
}

const csmSpeakerContentPath = 'content/speakers'
export async function GetSpeakers(): Promise<Speaker[]> {
  const filesInProjects = fs.readdirSync(csmSpeakerContentPath)
  return filesInProjects.map((file) => {
    const filename = file.slice(0, file.indexOf('.'))
    const data = matter(fs.readFileSync(`${csmSpeakerContentPath}/${filename}.md`, 'utf8'))
    const rawSpeaker = data.data as RawSpeakerData
    return {
      id: rawSpeaker.id,
      name: rawSpeaker.name,
      description: rawSpeaker.description,
      avatar: rawSpeaker.avatar, 
      avatarUrl: rawSpeaker.avatarUrl,
    }
  })
}

const findSpeakerForSession = (sessionSpeakers: RawSessionData['speakers'], speakers: Speaker[]): Speaker[] => {
  return sessionSpeakers.map((sessionSpeaker) => {
    const speaker = speakers.find((speaker) => speaker.id === sessionSpeaker.id)
    if (!speaker) {
      throw new Error(`Speaker ${sessionSpeaker.id} not found`)
    }
    return speaker
  })
}

const findStageForSession = (sessionStage: RawSessionData['stage'], stages: Stage[]): Stage => {
  const stage = stages.find((stage) => stage.id === sessionStage)
  if (!stage) {
    throw new Error(`Stage ${sessionStage} not found`)
  }
  return stage
}
