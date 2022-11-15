import { EventController } from 'services/event'
import { ScheduleTypes, Schedule } from 'types/config'
import { Session } from 'types'


export class SessionController {

  static async getSessions(): Promise<Session[] | null> {
    const event = await EventController.getEvent()
    if (!event.schedule) {
      return []
    }
    return await this.GetSchedule(event.schedule.type, event.schedule.config)
  }

  static async GetSchedule(type: ScheduleTypes, config: Schedule["config"]): Promise<Session[] | null> {
    console.log('GET Schedule from module', type, config)

    try {
        const module: any = await import(`services/schedule/${type}/index`)
        console.log(module)
        const schedule = await module.GetSchedule(config)
        return schedule
    }
    catch (e) {
        console.log('Unable to get schedule info..')
        console.error(e)
    }

    return null
}
}
