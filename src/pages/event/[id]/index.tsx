import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { Event } from 'types'
import { GetEventNames, GetEvents } from 'services/event'
import Schedule from 'components/Schedule'
import Player from 'components/Player'
import PlayerHeader from 'components/Player/Header'
import PlayerStatus from 'components/Player/Status'
import useStreams from 'components/Hooks/useStreams'

interface Props {
  event: Event
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function EventPage(props: Props) {
  const { streams, streamsLoading } = useStreams(props.event)

  return (
    <>
      <div>
        <div className="section">
          <div className="content">
            <h2>{props.event.name}</h2>
            <p>{props.event.description}</p>
            <div style={{ marginTop: '30px' }}>
              <div className="player-wrapper">
                <PlayerHeader />
                <PlayerStatus />
                <Player streams={streams} poster={props.event.poster} isLoading={streamsLoading} />
                <Schedule sessions={props.event.schedule.sessions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = GetEventNames()

  return {
    paths: events.map(i => {
      return { params: { id: i } }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async context => {
  const events = GetEvents()
  const event = events.find(i => i.id === context.params?.id)

  if (!event) {
    return {
      props: null,
      notFound: true,
    }
  }

  return {
    props: {
      event,
    },
  }
}
