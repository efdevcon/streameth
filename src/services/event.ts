import fs from 'fs'
import { Event } from 'types'
import { GetArchive } from './archive'
import cacheData from "memory-cache"



const configPath = './config/streameth.json'

export class EventController {


  static async getEvent(): Promise<Event> {
    if (!fs.existsSync(configPath)) {
      new Error('No config file found')
    }
    const config = fs.readFileSync(configPath, 'utf8')
    return JSON.parse(config)
  }

  static async getArchive(): Promise<Event["archive"] | null> {

    const event = await this.getEvent()
    if (!event.archive) {
      return null
    }
    return event.archive
  }

  static async getSchedule(): Promise<Event["schedule"] | null> {
    const event = await this.getEvent()
    if (!event.schedule) {
      return null
    }
    return event.schedule
  }

  static async getStream(): Promise<Event["stream"] | null> {
    const event = await this.getEvent()
    if (!event.stream) {
      return null
    }
    return event.stream
  }

}