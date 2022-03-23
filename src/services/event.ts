import fs from 'fs'
import { resolve, join } from 'path'
import { Event, Stream } from 'types'
import { getStreams } from './stream'

const mergeStreamData = (event: Event, streams: Array<Stream>) => {
  const eventDup = { ...event }

  for (let i = 0; i < eventDup.streams.length; i++) {
    let eventStreamObj: Stream = eventDup.streams[i]

    for (let j = 0; j < streams.length; j++) {
      const stream: Stream = streams[j]

      if (stream.id === eventStreamObj.id) {
        eventStreamObj = Object.assign(eventStreamObj, stream)
      }
    }
  }

  return eventDup
}

export function GetEventNames(): Array<string> {
  const dir = resolve('./data/events')
  const dirs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(i => i.isFile() && i.name.endsWith('.json'))
    .map(i => i.name.replace('.json', ''))

  return dirs
}

export async function GetEvents(): Promise<Array<Event>> {
  const streams: Array<Stream> = await getStreams()

  const dir = resolve('./data/events')
  const files = fs.readdirSync(dir, { withFileTypes: true }).filter(i => i.isFile() && i.name.endsWith('.json'))

  const items = files
    .map(i => {
      const fullPath = join(dir, i.name)
      const content = fs.readFileSync(fullPath, 'utf8')
      if (!content) {
        console.log('File has no content..', i.name)
      }

      if (content) {
        let event = JSON.parse(content) as Event
        event = mergeStreamData(event, streams)

        return {
          ...event,
          id: i.name.replace('.json', ''),
        }
      }
    })
    .filter(i => !!i) as Array<Event>

  return items
}
