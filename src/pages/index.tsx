import { GetStaticProps } from 'next'
import { Stage, Session, page } from 'types'
import { SEO } from 'components/seo'
import { GetStages, GenerateNavigation } from 'services/stage'
import { GetSessionsForStage } from 'services/sessions'
import { PageContextProvider } from 'context/page-context'
import DefaultLayout from 'layouts/default'
import { StageComponent } from 'components/Stage/StageComponent'

interface Props {
  stage: Stage
  sessions: Session[]
  pages: page[]
}

export default function StagePage({ stage, sessions, pages }: Props) {
  return (
    <PageContextProvider sessions={sessions} stage={stage}>
      <DefaultLayout pages={pages}>
        <SEO title="schedule" />
        <StageComponent />
      </DefaultLayout>
    </PageContextProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const stages = await GetStages()

  const stage = stages[0]
  if (!stage) return { props: null, notFound: true }

  const pages = await GenerateNavigation()

  const sessions = await GetSessionsForStage(stage.id)
  return {
    props: {
      stage,
      sessions,
      pages,
    },
  }
}
