import { GetStaticPaths, GetStaticProps } from 'next'
import { GetSessions, GetSessionById } from 'services/sessions'
import { Session, page } from 'types'
import { ParsedUrlQuery } from 'querystring'
import SessionComponent from 'components/Session/SessionComponent'
import { SEO } from 'components/seo'
import { DefaultLayout } from 'layouts'
import { GenerateNavigation } from 'services/stage'
interface Props {
  session: Session,
  pages: page[]
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function Stage(props: Props) {

  return (
    <DefaultLayout pages={props.pages}>
      <SEO title={props.session.name} />
      <SessionComponent session={props.session} />
    </DefaultLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sessions = await GetSessions()
  return {
    paths: sessions ? sessions.map((session) => ({ params: { id: session.id } })) : [],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const sessionId = context.params?.id
  if (!sessionId) return { props: null, notFound: true }

  const session = await GetSessionById(sessionId)
  if (!session) return { props: null, notFound: true }
  const pages = await GenerateNavigation()
  return {
    props: {
      session,
      pages,
    },
  }
}
