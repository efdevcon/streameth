import { GetStaticPaths, GetStaticProps } from 'next'
import { GetEvent } from 'services/event'
import { Event } from 'types'
import Page from 'layouts/event-page'
import { EventComponent } from 'components/EventComponent'
import { ParsedUrlQuery } from 'querystring'
import { SEO } from 'components/seo'
import fs from 'fs'
import matter from 'gray-matter'

interface Props {
  event?: Event
  stageId?: string
}

interface Params extends ParsedUrlQuery {
  id: string
  type: 'cms' | 'config'
}

export default function Stage(props: Props) {
  console.log(props.event?.stream.stages)
  const stage = props.event?.stream.stages.find(i => i.id === props.stageId)

  return (
    <Page event={props.event} stageId={props.stageId}>
      {stage && <SEO title={stage.name} />}
      <EventComponent />
    </Page>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const event = await GetEvent()
  const filesInProjects = fs.readdirSync('./src/content/stages')

  const pathsFromCMS = filesInProjects.map(file => {
    const filename = file.slice(0, file.indexOf('.'))
    return { params: { id: filename }}
  })


  const pathsFromConfig = event ? event.stream.stages.map(stage => ({ params: { id: stage.id } })) : []

  console.log([...pathsFromCMS, ...pathsFromConfig])
  return {
    paths: [...pathsFromCMS, ...pathsFromConfig],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const stageId = context.params?.id
  const type = context.params?.type
  console.log("context", context.params)

  if (!stageId) return { props: null, notFound: true }

  const event = await GetEvent()

  if (fs.existsSync(`./src/content/stages/${stageId}.md`)) {
    // add cms entries to the event
    const fileContent = matter(fs.readFileSync(`./src/content/stages/${stageId}.md`, 'utf8'))
    event?.stream.stages.push(fileContent.data as any)
  }

  return {
    props: {
      event,
      stageId,
    },
  }
}
