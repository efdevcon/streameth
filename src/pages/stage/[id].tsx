import { GetStaticPaths, GetStaticProps } from 'next'
import { GetEvent } from 'services/event'
import { Event } from 'types'
import Page from 'layouts/event-page'
import { EventComponent } from 'components/EventComponent'
import { ParsedUrlQuery } from 'querystring'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'

interface Props {
  event?: Event
  stageId?: string
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function Stage(props: Props) {
  return (
    <Page event={props.event} stageId={props.stageId}>
      <EventComponent />
    </Page>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const event = await GetEvent()

  return {
    paths: event ? event?.stream.stages.map((i) => ({ params: { id: i.id } })) : [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const stageId = context.params?.id
  if (!stageId) return { props: null, notFound: true }

  const event = await GetEvent()

  return {
    props: event
      ? {
          event,
          stageId,
        }
      : {},
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
