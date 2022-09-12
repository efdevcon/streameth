import fs from 'fs'
import { Event } from 'types'
import { GetArchive } from './archive'
import { GetSchedule } from './schedule'

const configPath = './config/streameth.json'

export async function GetEvent(): Promise<Event | undefined> {
  if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, 'utf8')
    let event = JSON.parse(config)

    // get core modules
    // - streams

    const sessions = await GetSchedule(event.schedule.type, event.schedule.config)
    event.schedule.sessions = sessions

    const archive = await GetArchive(event.archive.type, event.archive.config)
    event.archive.sessions = archive

    return event
  }
}
