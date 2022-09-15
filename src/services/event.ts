import fs from 'fs'
import { Event } from 'types'
import { GetArchive } from './archive'
import { GetSchedule } from './schedule'
import cacheData from "memory-cache"

const configPath = './config/streameth.json'

export async function GetEvent(): Promise<Event | undefined> {
  const value = cacheData.get('event')
  if (value) {
    console.log('Return event data from memory-cache..')
    return value
  }

  if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, 'utf8')
    let event = JSON.parse(config)

    // get core modules
    // - streams

    const sessions = await GetSchedule(event.schedule.type, event.schedule.config)
    event.schedule.sessions = sessions

     // const archive = await GetArchive(event.archive.type, event.archive.config)
    // event.archive.sessions = archive

    cacheData.put('event', event)
    return event
  }
}
