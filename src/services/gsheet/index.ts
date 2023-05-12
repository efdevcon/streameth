import { Session, Stage, Speaker } from 'types'
import { DataConfig } from 'types/config'
import { google } from 'googleapis'
import { GetSlug } from 'utils/format'
import { datetimeToUnixTimestamp } from 'utils/dateTime'
import { promises as fs } from 'fs'
import path from 'path'
import PQueue from 'p-queue'
import moment from 'moment'
const SPEAKER_SHEET = 'Speakers'
const SPEAKER_DATA_RANGE = 'A3:I'

const STAGE_SHEET = 'Stages'
const STAGE_DATA_RANGE = 'A3:D'

const SESSION_SHEET = 'Sessions'
const SESSION_DATA_RANGE = 'A3:M'

const API_QUEUE = new PQueue({ concurrency: 1, interval: 1500 })

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
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw err
  }
}

async function connectToGoogleSheets(config: DataConfig) {
  if (!config['sheetId']) throw new Error('No valid sheetId set for gsheet module')
  if (!process.env.GOOGLE_API_KEY) throw new Error("gsheet module requires a valid 'GOOGLE_API_KEY' env variable")

  const sheets = google.sheets({
    version: 'v4',
    auth: process.env.GOOGLE_API_KEY,
  })

  return sheets
}

async function getSheetName(config: DataConfig) {
  const sheets = await connectToGoogleSheets(config)
  const sheetId = config['sheetId'] as string

  const sheetsResponse = await API_QUEUE.add(() =>
    sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    })
  )

  const sheetName = sheetsResponse?.data?.sheets?.map((i: any) => i.properties.title)[0]
  if (!sheetName) throw new Error('No valid sheet name found')

  return sheetName
}

async function getDataForRange(config: DataConfig, sheetName: string, range: string): Promise<any> {
  const localCache = await getLocalJsonCache(range)
  if (localCache) return localCache

  const sheets = await connectToGoogleSheets(config)
  // const sheetName = await getSheetName(config)
  const sheetId = config['sheetId'] as string

  const response = (await API_QUEUE.add(() =>
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${sheetName}!${range}`,
    })
  )) as any

  const rows = response.data.values
  if (!rows) return []

  await createLocalJsonCache(rows, range)
  return rows
}

export async function GetStages(config: DataConfig): Promise<Stage[]> {
  const data = await getDataForRange(config, STAGE_SHEET, STAGE_DATA_RANGE)
  const a = data.map((row: any) => {
    const [id, name, streamId, image] = row
    if (!id) return null
    return {
      id: GetSlug(id),
      name,
      stream: [
        {
          id: streamId,
        },
      ],
    }
  })
  return a.filter((i: any) => i)
}

export async function getSpeakers(config: DataConfig): Promise<Speaker[]> {
  const data = await getDataForRange(config, SPEAKER_SHEET, SPEAKER_DATA_RANGE)
  return data.map((row: any) => {
    const [id, name, Description, AvatarUrl] = row
    return {
      id: name,
      name,
      description: Description,
      avatar: AvatarUrl ?? null,
    }
  })
}

export async function getSessions(config: DataConfig): Promise<Session[]> {
  const data = await getDataForRange(config, SESSION_SHEET, SESSION_DATA_RANGE)
  const speakerData = await getSpeakers(config)
  const stageData = await GetStages(config)

  return data.map((row: any) => {
    const [id, Name, Description, stageId, Day, Start, End, Speaker1, Speaker2, Speaker3, Speaker4, Speaker5, video] = row
    const speakersRaw = [Speaker1, Speaker2, Speaker3, Speaker4, Speaker5].map((id: string) => {
      let speaker

      try {
        if (!id) return null

        speaker = speakerData.find((i) => {
          return i.id === id
        })
        if (!speaker) throw new Error(`No speaker found for id ${id}`)
      } catch (error) {
        console.log(error)
        return null
      }

      return speaker
    })

    const speakers = speakersRaw.filter((i) => i !== null)

    let stage
    try {
      stage = stageData.find((i) => i.id === GetSlug(stageId))
      if (!stage) throw new Error(`No stage found for id ${stageId}`)
    } catch (error) {
      console.error(error)
      stage = null
    }

    const start = moment(`${Day} ${Start}`).valueOf()
    const end = datetimeToUnixTimestamp(`${Day} ${End}`)

    return {
      id: GetSlug(id),
      name: Name,
      description: Description,
      start,
      end,
      stage,
      speakers,
      video: video ?? null,
    }
  })
}

export async function GetSchedule(config: DataConfig): Promise<Session[]> {
  return await getSessions(config)
}
