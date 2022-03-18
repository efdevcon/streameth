
import fs from 'fs'
import { resolve, join } from 'path'
import { Event } from 'types'

export function GetEventNames(): Array<string> {
    const dir = resolve('./events')
    const dirs = fs.readdirSync(dir, { withFileTypes: true })
        .filter(i => i.isFile() && i.name.endsWith('.json'))
        .map(i => i.name.replace('.json', ''))

    return dirs
}

export function GetEvents(): Array<Event> {
    const dir = resolve('./events')
    const files = fs.readdirSync(dir, { withFileTypes: true })
        .filter(i => i.isFile() && i.name.endsWith('.json'))

    const items = files.map(i => {
        const fullPath = join(dir, i.name)
        const content = fs.readFileSync(fullPath, 'utf8')
        if (!content) {
            console.log('File has no content..', i.name)
        }

        if (content) {
            let event = JSON.parse(content) as Event
            return {
                ...event,
                id: i.name.replace('.json', '')
            }
        }
    }).filter(i => !!i) as Array<Event>

    return items
}