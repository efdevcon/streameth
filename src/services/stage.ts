import { Stage, page } from 'types'
import { ConfigController } from 'services/config'

export async function GetStages(): Promise<Stage[]> {
  const event = await ConfigController.getConfig()
  if (!event.data) {
    throw new Error('No event found, please check configuration object')
  }

  const { type, config } = event.data

  const module: any = await import(`services/${type}/index`)
  const stages = await module.GetStages(config)
  if (!stages || stages.length === 0) {
    throw new Error('No stages found, please check configuration object')
  }
  return stages
}

export async function GenerateNavigation(): Promise<page[]> {
  const stages = await GetStages()
  return stages.map((stage) => {
    return {
      name: stage.name,
      href: `/stage/${stage.id}`,
    }
  })
}

export async function GetStageById(id: string): Promise<Stage | undefined> {
  const stages = await GetStages()
  const stage = stages.find((stage) => stage.id === id)
  if (!stage) {
    return undefined
  }
  return stage
}
