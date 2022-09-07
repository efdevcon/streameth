import { GetStaticPaths, GetStaticProps } from 'next'
import { GetEvent } from 'services/event'
import { Event, Session } from 'types'
import Page from 'layouts/event-page'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  event: Event
  session: Session
  sessionId?: string
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function Stage(props: Props) {
  return (
    <Page event={props.event}>
      <h2>{props.session.name}</h2>
      <p>{props.session.description}</p>
      <p>- {props.session.speakers.map(i => i.name).join(', ')}</p>
    </Page>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const event = await GetEvent()

  return {
    paths: event ? event?.stream.stages.map((i) => ({ params: { id: i.id } })) : [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const sessionId = context.params?.id
  if (!sessionId) return { props: null, notFound: true }

  const event = await GetEvent()
  const session = event?.schedule.sessions.find(i => i.id === sessionId)
  if (!event || !session) return { props: null, notFound: true }

  return {
    props: {
      event,
      session,
      sessionId,
    }
  }
}