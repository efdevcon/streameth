import { GetStaticPaths, GetStaticProps } from 'next'
import { Speaker, Stage, Session } from 'types'
import { StageComponent } from 'components/Stage/StageComponent'
import { ParsedUrlQuery } from 'querystring'
import { SEO } from 'components/seo'
import { StageController } from 'services/stage'
import { GetSessionsForStage } from 'services/sessions'
import { GetSpeakers } from 'services/speakers'
import { PageContextProvider } from 'context/page-context'

interface Props {
  stage: Stage 
  sessions: Session[] 
  speakers: Speaker[] 
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function StagePage(props: Props) {
  const { stage, speakers, sessions } = props

  return (
    <PageContextProvider activeStage={stage} sessions={sessions} speakers={speakers}>
      {stage && <SEO title={stage.name} />}
      <StageComponent />
    </PageContextProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stages = await StageController.getStages()

  return {
    paths: stages.map((stage) => ({ params: { id: stage.id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const stageId = context.params?.id
  if (!stageId) return { props: null, notFound: true }
  const stage = await StageController.getStage(stageId)
  if (!stage) return { props: null, notFound: true }

  const sessions = await GetSessionsForStage(stageId)

  const speakers = await GetSpeakers()
  return {
    props: {
      stage,
      sessions,
      speakers,
    },
  }
}
