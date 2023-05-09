import { GetStaticPaths, GetStaticProps } from 'next'
import { Stage, Session } from 'types'
import { StageComponent } from 'components/Stage/StageComponent'
import { ParsedUrlQuery } from 'querystring'
import { SEO } from 'components/seo'
import { GetStages, GetStageById, GenerateNavigation } from 'services/stage'
import { GetSessionsForStage } from 'services/sessions'
import { PageContextProvider } from 'context/page-context'
import { page } from 'types'
import DefaultLayout from 'layouts/default'

interface Params extends ParsedUrlQuery {
  id: string
}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const stages = await GetStages()
  return {
    paths: stages.map((stage) => ({ params: { id: stage.id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const stageId = context.params?.id
  if (!stageId) return { props: null, notFound: true }

  const stage = await GetStageById(stageId)
  if (!stage) return { props: null, notFound: true }

  const pages = await GenerateNavigation()

  const sessions = await GetSessionsForStage(stageId)
  return {
    props: {
      stage,
      sessions,
      pages,
    },
  }
}
