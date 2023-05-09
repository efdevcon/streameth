import { ConfigController } from 'services/config'
import { Speaker } from 'types'

export async function GetSpeakers(): Promise<Speaker[]> {
  const event = await ConfigController.getConfig()
  if (!event.data) {
    return []
  }

  const { type, config } = event.data

  try {
    const module: any = await import(`services/${type}/index`)
    const schedule = await module.GetSpeakers(config)
    return schedule
  } catch (e) {
    console.log('Unable to  load speakers..')
    console.error(e)
    throw e
  }
}
