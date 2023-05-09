import { GetStaticProps } from 'next'
import { Stage, Session, page } from 'types'
import { StageComponent } from 'components/Stage/StageComponent'
import { SEO } from 'components/seo'
import { GetStages, GenerateNavigation } from 'services/stage'
import { GetSessionsForStage } from 'services/sessions'
import { PageContextProvider } from 'context/page-context'
import DefaultLayout from 'layouts/default'

interface Props {
  stage: Stage
  sessions: Session[]
  pages: page[]
}

export default function StagePage({ stage, sessions, pages }: Props) {
  return (
    <PageContextProvider stage={stage} sessions={sessions}>
      <DefaultLayout pages={pages}>
        {stage && <SEO title={stage.name} />}
        <StageComponent />
      </DefaultLayout>
    </PageContextProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const stages = await GetStages()
  const stage = stages[0]
  const sessions = await GetSessionsForStage(stage.id)
  const pages = await GenerateNavigation()
  if (!stage) return { props: null, notFound: true }
  return {
    props: {
      stage,
      sessions,
      pages,
    },
  }
}
