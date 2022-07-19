import fs from 'fs'
import { Event } from 'types'

const configPath = './config/streameth.json'

export function GetEvent(): Event | undefined {
  if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, 'utf8')
    return JSON.parse(config)
  }
}
