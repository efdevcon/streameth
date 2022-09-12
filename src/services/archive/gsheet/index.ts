import { Session } from "types"
import { Config } from "types/config"
import { GetSchedule } from "services/schedule/gsheet"

export async function GetArchive(config: Config): Promise<Session[]> {
    return GetSchedule(config)
}