import { Session } from "types";
import { Config, ScheduleTypes } from "types/config";

export async function GetSchedule(type: ScheduleTypes, config: Config): Promise<Session[]> {
    console.log('GET Schedule from module', type, config)

    try {
        const module: any = await import(`/${type}/index`)
        const schedule = await module.GetSchedule(config)
        return schedule
    }
    catch (e) {
        console.log('Unable to get schedule info..')
        console.error(e)
    }

    return []
}