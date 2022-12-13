import { Session, Stage, Speaker } from 'types'
import { Config } from 'types/config'
import { google } from 'googleapis'
import { GetSlug, GetYouTubeVideoIdFromUrl } from 'utils/format'
import { datetimeToUnixTimestamp } from 'utils/dateTime'

async function createLocalJsonCache(data: any, filename: string) {
  const fs = await import('fs')
  const path = await import('path')
  const cachePath = path.join(process.cwd(), 'cache')
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath)
  }
  fs.writeFileSync(path.join(cachePath, `${filename}.json`), JSON.stringify(data))
}

async function getLocalJsonCache(filename: string) {
  const fs = await import('fs')
  const path = await import('path')
  const cachePath = path.join(process.cwd(), 'cache')
  const cacheFile = path.join(cachePath, `${filename}.json`)
  if (!fs.existsSync(cacheFile)) {
    return null
  }
  const cacheData = fs.readFileSync(cacheFile, 'utf8')
  return JSON.parse(cacheData)
}



export function avoidRateLimit(delay = 1500) {


  return new Promise((resolve) => {
    setTimeout(resolve, 1)
  })
}

async function ConnectToGoogleSheets(config: Config) {
  if (!config['sheetId']) throw new Error('No valid sheetId set for gsheet module')
  if (!process.env.GOOGLE_API_KEY) throw new Error("gsheet module requires a valid 'GOOGLE_API_KEY' env variable")
  const sheets = google.sheets({
    version: 'v4',
    auth: process.env.GOOGLE_API_KEY,
  })
  return sheets
}

async function getSheetName(config: Config) {
  await avoidRateLimit()

  const sheets = await ConnectToGoogleSheets(config)
  const sheetId = config['sheetId'] as string
  const sheetsResponse = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
  })
  const sheetName = sheetsResponse?.data?.sheets?.map((i: any) => i.properties.title)[0]
  if (!sheetName) throw new Error('No valid sheet name found')
  return sheetName
}

async function GetDataForRange(config: Config, range: string): Promise<any> {
  await avoidRateLimit()
  const localCache = await getLocalJsonCache(range)
  if (localCache) return localCache


  const sheets = await ConnectToGoogleSheets(config)
  const sheetName = await getSheetName(config)
  const sheetId = config['sheetId'] as string

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${sheetName}!${range}`,
  })

  const rows = response.data.values
  if (!rows) return []
  createLocalJsonCache(rows, range)
  return rows
}

const STAGE_DATA_RANGE = 'A4:D'
export async function GetStages(config: Config): Promise<Stage[]> {

  const data = await GetDataForRange(config, STAGE_DATA_RANGE)
  return data.map((row: any) => {
    const [id, name, streamId, image] = row
    return {
      id,
      name,
      stream: [
        {
          id: streamId,
        },
      ],
    }
  })
}

const SPEAKER_DATA_RANGE = 'F4:I'
export async function GetSpeakers(config: Config): Promise<Speaker[]> {

  const data = await GetDataForRange(config, SPEAKER_DATA_RANGE)
  return data.map((row: any) => {
    const [id, name, Description, AvatarUrl] = row
    return {
      id,
      name,
      description: Description,
      avatar: AvatarUrl ?? null,
    }
  })
}

const SESSION_DATA_RANGE = 'K4:V'
export async function GetSessions(config: Config): Promise<Session[]> {

  const data = await GetDataForRange(config, SESSION_DATA_RANGE)
  const speakerData = await GetSpeakers(config)
  const stageData = await GetStages(config)
  return data.map((row: any) => {
    const [id, Name, Description, stageId, Day, Start, End, Speaker1Id, Speaker2Id, Speaker3Id, Speaker4Id, video] = row
    const speakersRaw = [Speaker1Id, Speaker2Id, Speaker3Id, Speaker4Id].map((id: string) => {
      if (!id) return null
      const speaker = speakerData.find((i) => i.id === id)
      if (!speaker) throw new Error(`No speaker found for id ${id}`)
      return speaker
    })

    const speakers = speakersRaw.filter((i) => i !== null)

    const stage = stageData.find((i) => i.id === stageId)
    if (!stage) throw new Error(`No stage found for id ${stageId}`)

    const start = datetimeToUnixTimestamp(`${Day} ${Start}`)
    const end = datetimeToUnixTimestamp(`${Day} ${End}`)
    return {
      id,
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
export async function GetSchedule(config: Config): Promise<Session[]> {
  return await GetSessions(config)
}
