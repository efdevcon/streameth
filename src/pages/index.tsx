import { GetStaticProps } from 'next'
import { GetSessions } from 'services/sessions'
import { GetSpeakers } from 'services/speakers'
import { Session, Speaker } from 'types'
import ScheduleComponent from 'components/Schedule/ScheduleComponent'
import { SEO } from 'components/seo'
import { PageContextProvider } from 'context/page-context'
interface Props {
  sessions: Session[]
}

export default function Schedule(props: Props) {
  const { sessions } = props

  return (
    <PageContextProvider sessions={sessions}>
      <SEO title='Schedule' />
      <ScheduleComponent />
    </PageContextProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {

  const sessions = await GetSessions()
  return {
    props: {
      sessions,
    },
  }
}
