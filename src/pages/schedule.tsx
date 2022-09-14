import { GetStaticProps } from 'next'
import { GetEvent } from 'services/event'
import { Event, Session, Stage } from 'types'
import Page from 'layouts/event-page'
import ScheduleComponent from 'components/Schedule/ScheduleComponent'
import moment from 'moment'

interface Props {
  event?: Event
  sessions: Session[]
  stages: Stage['name'][]
  days: string[]
}

export default function Schedule(props: Props) {

  return (
    <Page event={props.event}>
      <ScheduleComponent sessions={props.sessions} stages={props.stages} days={props.days} />
    </Page>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const event = await GetEvent()
  const stages = event?.stream.stages.map((i) => i.name) || []
  // get all different days in the sessions
  const days = event?.schedule.sessions.reduce((acc, session) => {
    const day = moment(session.start).format('MMM DD')
    console.log(day)
    if (!acc.includes(day)) {
      acc.push(day)
    }
    return acc
  }, [] as string[]) || []
  const sessions = event?.schedule.sessions || []


  return {
    props: {
      event,
      sessions,
      stages,
      days,
    },
  }
}
