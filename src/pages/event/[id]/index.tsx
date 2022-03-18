import React from "react"
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { DEFAULT_REVALIDATE_PERIOD } from "utils/constants"
import { Event } from "types"
import { GetEventNames, GetEvents } from "services/event"

interface Props {
  event: Event
}

interface Params extends ParsedUrlQuery {
  id: string
}

export default function EventPage(props: Props) {
  return <>
    <div>
      <h2>{props.event.name}</h2>
      <p>{props.event.description}</p>
    </div>
  </>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = GetEventNames()

  return {
    paths: events.map(i => {
      return { params: { id: i } }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const event = GetEvents().find(i => i.id === context.params?.id)
  if (!event) {
    return {
      props: null,
      notFound: true,
    }
  }

  return {
    props: {
      event,
    }
  }
}
