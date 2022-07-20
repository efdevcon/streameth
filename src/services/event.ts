import fs from 'fs'
import { Event } from 'types'
import { GetSchedule } from './schedule'

const configPath = './config/streameth.json'

export async function GetEvent(): Promise<Event | undefined> {
  if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, 'utf8')
    let event = JSON.parse(config)

    // get core modules
    // - streams 
    
    // - schedule
    const sessions = await GetSchedule(event.schedule.type, event.schedule.config)
    event.schedule.sessions = sessions
    // - archive

    return event
  }
}
