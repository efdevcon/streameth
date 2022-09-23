import { Session, Stage } from "types";
import { Config } from "types/config";
import { GetSlug } from "utils/format";

export async function GetSchedule(config: Config): Promise<Session[]> {
    if (!config['apiBaseUri']) throw new Error('No valid apiBaseUri set for Pretalx module')
    if (!process.env.PRETALX_API_KEY) console.warn('PRETALX_API_KEY not set.')

    const stages = await GetStages(config)
    if (stages?.length > 0) {
        console.log('The following stages are available to configure..')
        console.log('=====')
        stages.forEach(i => console.log(`{ "id": "${i.id}", "name": "${i.name}${i.description ? '- ' + i.description : ''}", "stream": [] }`))
        console.log('=====')
        console.log()
    }

    const talks = await GetRecursive('talks', config)
    return talks.map((i: any) => {
        let session: Session = {
            id: i.code,
            name: i.title,
            start: new Date(i.slot.start).getTime(),
            end: new Date(i.slot.end).getTime(),
            speakers: i.speakers?.map((x: any) => {
                return {
                    id: x.code,
                    name: x.name,
                    description: x.biography,
                    avatar: x.avatar ?? '',
                }
            }) ?? [],
        }

        if (i.abstract) session.abstract = i.abstract
        if (i.description) session.description = i.description
        if (i.track?.en) session.track = i.track?.en
        if (i.slot?.room?.en) session.stage = i.slot?.room?.en

        return session
    })
}

export async function GetStages(config: Config): Promise<Stage[]> {
    const rooms = await GetRecursive('rooms', config)
    return rooms.map((i: any) => {
        let stage: Stage = {
            id: i.name?.en ? GetSlug(i.name?.en) : String(i.id),
            name: i.name?.en ?? '',
            stream: [],
        }

        if (i.description?.en) stage.description = i.description?.en
        if (i.speaker_info?.en) stage.info = i.speaker_info?.en
        if (i.capacity) stage.capacity = i.capacity

        return stage
    })
}

async function GetRecursive(endpoint: string, config: Config, offset: number = 0, results = [] as any): Promise<any> {
    return Get(`${endpoint}${endpoint.includes('?') ? '&' : '?'}limit=100&offset=${offset}`, config).then((data: any) => {
        results.push(data.results)

        if (data.next) {
            return GetRecursive(endpoint, config, offset + 100, results)
        } else {
            console.log('Total results', results.flat().length)
            return results.flat()
        }
    })
}

async function Get(endpoint: string, config: Config) {
    const request: any = {}
    if (process.env.PRETALX_API_KEY) {
        request.headers = {
            Authorization: `Token ${process.env.PRETALX_API_KEY}`
        }
    }

    const uri = `${String(config['apiBaseUri']).replace(/\/$/, '')}/${endpoint}`
    console.log('GET', process.env.PRETALX_API_KEY ? 'Authorized' : '', uri)
    const response = await fetch(uri, request)

    return await response.json()
}