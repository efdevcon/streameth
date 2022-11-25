import fs from 'fs'
import { Session } from 'types'
import matter from 'gray-matter'
const cmsContentPath = './content/sessions'
import {datetimeToUnixTimestamp} from 'utils/dateTime'

export async function GetSchedule(): Promise<Session[]> {
  const filesInProjects = fs.readdirSync(cmsContentPath)
  return filesInProjects.map((file) => {
    const filename = file.slice(0, file.indexOf('.'))
    const data = matter(fs.readFileSync(`${cmsContentPath}/${filename}.md`, 'utf8'))
    return {
      id: filename,
      name: data.data.name,
      description: data.data.description,
      stage: data.data.stage,
      start: datetimeToUnixTimestamp(data.data.start),
      end: datetimeToUnixTimestamp(data.data.end),
      speakers: data.data.speakers,
      video: data.data.video ?? null,
    }
  })
}
