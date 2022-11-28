import { Stage } from 'types'
import { EventController } from 'services/event'




export async function GetStages(): Promise<Stage[]> {
  const event = await EventController.getEvent()
  if (!event.data) {
    throw new Error('No event found, please check configuration object')
  }

  const { type, config } = event.data


  try {
    const module: any = await import(`services/${type}/index`)
    const stages = await module.GetStages(config)
    return stages
  }
  catch (e) {
    console.error(e)
    throw new Error('Unable to get stages data...')
  }
}

export async function GetStageById(id: string): Promise<Stage | undefined > {
  const stages = await GetStages()
  const stage = stages.find((stage) => stage.id === id)
  if (!stage) {
    return undefined
  }
  return stage
}