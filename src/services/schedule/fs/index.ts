import fs from 'fs'
import { Session } from 'types';
import { Config } from "types/config";

const defaultScheduleFilePath = './config/schedule.json'

export async function GetSchedule(config: Config): Promise<Session[]> {
    const filePath = config['path'] ? config['path'] as string : defaultScheduleFilePath
    if (!fs.existsSync(filePath)) throw new Error('Schedule file not found')

    const schedule = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(schedule)
}