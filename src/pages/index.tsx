import { GetStaticProps } from 'next'
import { Stage, Session, page } from 'types'
import ScheduleComponent from 'components/Schedule/ScheduleComponent'
import { SEO } from 'components/seo'
import { GetStages, GenerateNavigation } from 'services/stage'
import { GetSessions } from 'services/sessions'
import { PageContextProvider } from 'context/page-context'
import DefaultLayout from 'layouts/default'

interface Props {
  stages: Stage[]
  sessions: Session[]
  pages: page[]
}

export default function StagePage({ stages, sessions, pages }: Props) {
  return (
    <PageContextProvider sessions={sessions} stages={stages}>
      <DefaultLayout pages={pages}>
        <SEO title="schedule" />
        <ScheduleComponent />
      </DefaultLayout>
    </PageContextProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const sessions = await GetSessions()
  const pages = await GenerateNavigation()
  const stages = await GetStages()
  return {
    props: {
      stages,
      sessions,
      pages,
    },
  }
}
