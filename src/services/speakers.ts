import { EventController } from 'services/event'
import { Speaker } from 'types'

export async function GetSpeakers(): Promise<Speaker[]> {
  const event = await EventController.getEvent()
  if (!event.data) {
    return []
  }

  const { type, config } = event.data

  try {
    const module: any = await import(`services/${type}/index`)
    console.log(module)
    const schedule = await module.GetSpeakers(config)
    return schedule
  } catch (e) {
    console.log('Unable to  load speakers..')
    console.error(e)
    throw e
  }
}
