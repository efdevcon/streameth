import { Session, Stage } from 'types'
import { DataConfig } from 'types/config'

export async function GetSchedule(config: DataConfig): Promise<Session[]> {
  if (!config['apiBaseUri']) throw new Error('No valid apiBaseUri set for Pretalx module')

  const response = await fetch(`${config['apiBaseUri']}/talks?limit=100`)
  const body = await response.json()

  return body.results.map((i: any) => {
    return {
      id: i.code,
      name: i.title,
      abstract: i.abstract,
      description: i.description,
      track: i.track?.en ?? '',
      start: new Date(i.slot.start).getTime() + 7200000,
      end: new Date(i.slot.end).getTime() + 7200000,
      stage: {
        id: 'main',
        name: 'Main stage',
        stream: [
          {
            id: 'e662b56b-f1a8-4e8a-b82a-cb240f043842',
          },
        ],
      },
      speakers: i.speakers.map((x: any) => {
        return {
          id: x.code,
          name: x.name,
          description: x.biography,
          avatarUrl: x.avatar,
        }
      }),
    }
  })
}

export async function GetStages(): Promise<Stage[]> {
  return [
    {
      id: 'main',
      name: 'Main stage',
      stream: [
        {
          id: 'e662b56b-f1a8-4e8a-b82a-cb240f043842',
        },
      ],
    },
  ]
}
