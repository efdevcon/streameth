import { GetStaticPaths, GetStaticProps } from 'next'
import { GetEvent } from 'services/event'
import { Event, Stage } from 'types'
import Page from 'layouts/event-page'
import { EventComponent } from 'components/EventComponent'
import { ParsedUrlQuery } from 'querystring'
import { SEO } from 'components/seo'

interface Props {
  event?: Event
  stageId?: string
  stage: Stage
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function StagePage(props: Props) {
  function getTrackImage() {
    if (props.stage.id === 'talk-5-opening-ceremonies') {
      return '/images/devcon/mainstage.jpg'
    }
    if (props.stage.id === 'talk-1') {
      return '/images/devcon/talk-1.jpg'      
    }
    if (props.stage.id === 'talk-2') {
      return '/images/devcon/talk-2.jpg'      
    }
    if (props.stage.id === 'talk-3') {
      return '/images/devcon/talk-3.jpg'      
    }
    if (props.stage.id === 'talk-4') {
      return '/images/devcon/talk-4.jpg'      
    }
  }
  return (
    <Page event={props.event} stageId={props.stageId}>
      <SEO title={props.stage.name} imageUrl={getTrackImage()} />
      <EventComponent />
    </Page>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const event = await GetEvent()

  return {
    paths: event ? event?.stream.stages.map((i) => ({ params: { id: i.id } })) : [],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const stageId = context.params?.id
  if (!stageId) return { props: null, notFound: true }

  const event = await GetEvent()
  const stage = event?.stream.stages.find(i => i.id === stageId)
  if (!stage) return { props: null, notFound: true }

  return {
    props: {
      event,
      stageId,
      stage
    },
  }
}
