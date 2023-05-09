import { GetStaticProps } from 'next'
import { GetSessions } from 'services/sessions'
import { Session, page } from 'types'
import DefaultLayout from 'layouts/default'
import { GenerateNavigation } from 'services/stage'
import ScheduleComponent from 'components/Schedule/ScheduleComponent'
import { SEO } from 'components/seo'
import { PageContextProvider } from 'context/page-context'

interface Props {
  sessions: Session[]
  pages: page[]
}

export default function Schedule(props: Props) {
  const { sessions, pages } = props

  return (
    <PageContextProvider sessions={sessions}>
      <DefaultLayout pages={pages}>
        <SEO title="Schedule" />
        <ScheduleComponent />
      </DefaultLayout>
    </PageContextProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sessions = await GetSessions()
  const pages = await GenerateNavigation()

  return {
    props: {
      sessions,
      pages,
    },
  }
}
