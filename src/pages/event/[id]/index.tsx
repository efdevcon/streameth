import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Event, Video } from 'types'
import { GetEventNames, GetEvents } from 'services/event'
import Widget from 'components/Widget'
import { SEO } from 'components/seo'
import { Archive } from 'components/Archive/archive'
import { GetVideos } from 'services/ipfs'

interface Props {
  event: Event
  events: Event[]
  videos: Video[]
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function EventPage(props: Props) {
  const showArchive = !!props.event.archive

  return (
    <>
      <SEO title={props.event.name} description={props.event.description} imageUrl={props.event.poster} />
      <div>
        <div className="section">
          <div className="content">
            <div style={{ marginTop: '30px' }}>
              {showArchive && <Archive event={props.event} videos={props.videos} />}
              {!showArchive && <Widget allEvents={props.events} event={props.event} />}
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

  let videos: Video[] = []
  if (event.archive && event.archive.type === 'ipfs') {
    videos = await GetVideos(event.archive.config.directory)
  }

  return {
    props: {
      event,
      events,
      videos
    },
  }
}
