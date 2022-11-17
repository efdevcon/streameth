import { GetStaticPaths, GetStaticProps } from 'next'
import { EventController } from 'services/event'
import { SessionController } from 'services/session'
import { Session } from 'types'
import { ParsedUrlQuery } from 'querystring'

import SessionComponent from 'components/Session/SessionComponent'
import { SEO } from 'components/seo'
interface Props {
  session: Session
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function Stage(props: Props) {

  return (
    <>
      <SEO title={props.session.name} />
      <SessionComponent session={props.session} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sessions = await SessionController.getSessions()
  return {
    paths: sessions ? sessions.map((session) => ({ params: { id: session.id } })) : [],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const sessionId = context.params?.id
  if (!sessionId) return { props: null, notFound: true }

  const event = await EventController.getEvent()
  const session = await SessionController.getSession(sessionId)

  if (!session) return { props: null, notFound: true }

  return {
    props: {
      session,
    },
  }
}
