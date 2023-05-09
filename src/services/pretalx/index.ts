import { Session } from "types";
import { DataConfig } from "types/config";

export async function GetSchedule(config: DataConfig): Promise<Session[]> {
    if (!config['apiBaseUri']) throw new Error('No valid apiBaseUri set for Pretalx module')

    const response = await fetch(`${config['apiBaseUri']}/talks?limit=100`)
    const body = await response.json()

    return body.results.map((i: any) => {
        return {
            id: i.code,
            name: i.title,
            abstract: i.abstract,
            description: i.description,
            track: i.track?.en ?? '',
            start: new Date(i.slot.start).getTime(),
            end: new Date(i.slot.end).getTime(),
            stage: i.slot?.room?.en ?? '',
            speakers: i.speakers.map((x: any) => {
                return {
                    id: x.code,
                    name: x.name,
                    description: x.biography,
                    avatarUrl: x.avatar
                }
            }),
        }
    })
}