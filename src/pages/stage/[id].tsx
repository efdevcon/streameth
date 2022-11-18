import { GetStaticPaths, GetStaticProps } from 'next'
import { Event, Stage, Session } from 'types'
import Page from 'layouts/event-page'
import { StageComponent } from 'components/Stage/StageComponent'
import { ParsedUrlQuery } from 'querystring'
import { SEO } from 'components/seo'
import { StageController } from 'services/stage'
import { EventController } from 'services/event'
import { SessionController } from 'services/session'
interface Props {
  event?: Event
  stage: Stage | null
  sessions: Session[] | null
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function StagePage(props: Props) {
  const { stage, event, sessions } = props

  return (
    <Page event={event} sessions={sessions} stage={stage}>
      {stage && <SEO title={stage.name} />}
      <StageComponent />
    </Page>
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
  const event = await EventController.getEvent()
  const sessions = await SessionController.getSessions()

  return {
    props: {
      event,
      stage,
      sessions,
    },
  }
}
