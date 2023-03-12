import { GetStaticProps } from 'next'
import { Stage, Session } from 'types'
import { StageComponent } from 'components/Stage/StageComponent'
import { SEO } from 'components/seo'
import { GetStages } from 'services/stage'
import { GetSessionsForStage } from 'services/sessions'
import { PageContextProvider } from 'context/page-context'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'

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
  if (!stage) return { props: null, notFound: true }

  const sessions = await GetSessionsForStage(stage.id)

  return {
    props: {
      stage,
      sessions,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD
  }
}
