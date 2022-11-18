

import { GetStaticPaths, GetStaticProps } from 'next'
import { Stage } from 'types'
import { ParsedUrlQuery } from 'querystring'
import { SEO } from 'components/seo'
import { StageController } from 'services/stage'
import { EventController } from 'services/event'
import EmbedLayout  from 'layouts/embed'
import StreamethPlayer from 'components/Player'
interface Props {
  stage: Stage
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function Embed(props: Props) {
  const { stage } = props

  return (
    <EmbedLayout>
      {stage && <SEO title={stage.name} />}
      <StreamethPlayer stage={props.stage} />
    </EmbedLayout>
  )
}

Embed.layout = EmbedLayout

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
  if (!stage) return { props: null, notFound: true }
  return {
    props: {
      event,
      stage,
    },
  }
}
