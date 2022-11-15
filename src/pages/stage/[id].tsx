import { GetStaticPaths, GetStaticProps } from 'next'
import { Event, Stage } from 'types'
import Page from 'layouts/event-page'
import { EventComponent } from 'components/EventComponent'
import { ParsedUrlQuery } from 'querystring'
import { SEO } from 'components/seo'
import {StageController} from 'services/stage'
import {GetEvent} from 'services/event'

interface Props {
  event?: Event
  stage: Stage | null
  stageId?: string
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function StagePage(props: Props) {
  const { stage, event, stageId } = props

  return (
    <Page event={event} stageId={stageId} stage={stage}>
      {stage && <SEO title={stage.name} />}
      <EventComponent />
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
  const event = await GetEvent()
  return {
    props: {
      event,
      stage,
      stageId,
    },
  }
}
