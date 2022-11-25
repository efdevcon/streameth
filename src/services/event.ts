import fs from 'fs'
import { Event } from 'types'

const configPath = './config/streameth.json'

export class EventController {
  static async getEvent(): Promise<Event> {
    if (!fs.existsSync(configPath)) {
      new Error('No config file found')
    }
    const config = fs.readFileSync(configPath, 'utf8')
    return JSON.parse(config)
  }
}
