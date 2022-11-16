import { GetStaticProps } from 'next'
import { EventController } from 'services/event'
import { SessionController } from 'services/session'
import { Event, Session, Stage } from 'types'
import Page from 'layouts/sessions-page'
import ScheduleComponent from 'components/Schedule/ScheduleComponent'
import { SEO } from 'components/seo'

interface Props {
  event?: Event 
  sessions: Session[] | null
}

export default function Schedule(props: Props) {

  return (
    <Page event={props.event} sessions={props.sessions}>
      <SEO title='Schedule' />
      <ScheduleComponent />
    </Page>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {

  const event = await EventController.getEvent()
  const sessions = await SessionController.getSessions()
  console.log(sessions[0])
  return {
    props: {
      event,
      sessions,
    },
  }
}
