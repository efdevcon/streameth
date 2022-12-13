import { EventController } from 'services/event'
import { Session, Stage } from 'types'

export async function GetSessions(): Promise<Session[]> {
  const event = await EventController.getEvent()
  if (!event.data) {
    return []
  }

  const { type, config } = event.data

  try {
    const module: any = await import(`services/${type}/index`)
    const schedule = await module.GetSchedule(config)
    return schedule
  }
  catch (e) {
    console.error(e)
    throw new Error('Unable to get session data...')
  }
}

export async function GetSessionsForStage(stage: Stage["id"]): Promise<Session[]> {
  const sessions = await GetSessions()
  const filteredSessions = sessions.filter((i) => i.stage.id === stage)
  if (filteredSessions.length === 0) {
    throw new Error(`No sessions found for stage ${stage}, at least 1 is required`)
  }
  return filteredSessions
}

export async function GetSessionById(id: string): Promise<Session | undefined> {
  const sessions = await GetSessions()
  return sessions.find((session) => session.id === id)
}
