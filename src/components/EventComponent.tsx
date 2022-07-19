import { useEvent } from 'hooks/useEvent'
import { useStage } from 'hooks/useStage'
import moment from 'moment'
import Link from 'next/link'

export function TestEventComponent() {
    const event = useEvent()
    const stage = useStage()

    return <div>
        <br />
        <section>
            Watching stage: {stage.id}
        </section>
        <br />

        <section>
            <h2>{event.name}</h2>
            <p>{moment(event.start).format('MMM DD')} - {moment(event.end).format('MMM DD')}</p>
        </section>
        <br />

        <section>
            <h3>Stages</h3>
            <ul>
                {event.stream.stages.map(i => {
                    return <li key={i.id}><Link href={`/stage/${i.id}`}>{i.id}</Link></li>
                })}
            </ul>
        </section>
    </div>
}

