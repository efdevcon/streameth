import { GetStaticPaths, GetStaticProps } from 'next'
import { GetEvent } from 'services/event'
import { Event, Session } from 'types'
import Page from 'layouts/event-page'
import { ParsedUrlQuery } from 'querystring'

import SessionComponent from 'components/Session/SessionComponent'
import { SEO } from 'components/seo'
interface Props {
  event?: Event
  session?: Session
  sessionId?: string
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function Stage(props: Props) {
  if (!props.session) return <></>

  return (
    <Page event={props.event}>
      <SEO title={props.session.name} />
      <SessionComponent session={props.session} />
    </Page>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const event = await GetEvent()

  return {
    paths: event ? event.schedule.sessions.map((i) => ({ params: { id: i.id } })) : [],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const sessionId = context.params?.id
  if (!sessionId) return { props: null, notFound: true }

  const event = await GetEvent()
  const session = event?.archive.sessions.find((i) => i.id === sessionId)

  return {
    props: {
      event,
      session,
      sessionId,
    },
  }
}
