import { Event, Video } from 'types'
import EventInfoBox from 'components/Event/InfoBox'
import css from './archive.module.scss'
import { Tags } from './tags'

interface Props {
    event: Event
    videos: Video[]
    className?: string
}

export function Archive(props: Props) {
    let className = `${css.container}`
    if (props.className) className += ` ${props.className}`

    return (
        <div className={className}>
            <EventInfoBox event={props.event} />

            {props.videos.length === 0 && <div>No videos found</div>}

            {props.videos.length > 0 && (
                <section className={css.gallery}>
                    {props.videos.map((i, index) => {
                        const tags = []
                        if (i.session?.room) tags.push(i.session.room)
                        if (i.session?.track) tags.push(i.session.track)
                        if (i.session?.tags) tags.push(...i.session.tags)

                        return <article key={`${index}_${i.id}`} className={css.card}>
                            <Tags className={css.tags} tags={tags} />
                            <video controls autoPlay={false} className={css.video}>
                                <source src={i.url} />
                            </video>
                            <div>
                                <a href={`#${i.slug}`}>
                                    <h4>{i.session?.name ?? i.slug}</h4>
                                </a>
                                {i.session?.speakers && <p className={css.description}>{i.session?.speakers.map(i => i.name).join(', ')}</p>}
                            </div>
                        </article>
                    })}
                </section>
            )}
        </div>
    )
}
