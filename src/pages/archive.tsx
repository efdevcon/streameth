import { GetStaticProps } from 'next'
import { GetEvent } from 'services/event'
import { Event } from 'types'
import Page from 'layouts/event-page'

interface Props {
  event?: Event
}

export default function Home(props: Props) {
  return (
    <Page event={props.event}>
    </Page>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const event = await GetEvent()

  return {
    props: {
      event,
    }
  }
}
