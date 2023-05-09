import { GetStaticProps } from 'next'
import { Stage, Session } from 'types'
import { StageComponent } from 'components/Stage/StageComponent'
import { SEO } from 'components/seo'
import { GetStages } from 'services/stage'
import { GetSessionsForStage } from 'services/sessions'
import { PageContextProvider } from 'context/page-context'

interface Props {
  stage: Stage 
  sessions: Session[] 
}

export default function StagePage(props: Props) {
  const { stage, sessions } = props

  return (
    <PageContextProvider stage={stage} sessions={sessions}>
      {stage && <SEO title={stage.name} />}
      <StageComponent />
    </PageContextProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const stages = await GetStages()
  const stage = stages[0]
  const sessions = await GetSessionsForStage(stage.id)
  if (!stage) return { props: null, notFound: true }
  return {
    props: {
      stage,
      sessions,
    },
  }
}
