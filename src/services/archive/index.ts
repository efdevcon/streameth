import { Session } from "types"
import { Config, ArchiveTypes } from "types/config"

export async function GetArchive(type: ArchiveTypes, config: Config): Promise<Session[]> {
    console.log('GET Archive from module', type, config)

    try {
        const module: any = await import(`/${type}/index`)
        return await module.GetArchive(config)
    }
    catch (e) {
        console.log('Unable to get archive..')
        console.error(e)
    }

    return []
}