import { GetStaticPaths, GetStaticProps } from 'next'
import { Stage } from 'types'
import { ParsedUrlQuery } from 'querystring'
import { SEO } from 'components/seo'
import { GetStages, GetStageById } from 'services/stage'
import { ConfigController } from 'services/config'
import EmbedLayout from 'layouts/embed'
import { Player } from 'components/Player'
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
      <Player streamId={props.stage.stream[0]} playerName={stage.name} />
    </EmbedLayout>
  )
}

Embed.layout = EmbedLayout

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
  return {
    props: {
      stage,
    },
  }
}
