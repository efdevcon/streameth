import { Event, Video } from 'types'
import EventInfoBox from 'components/Event/InfoBox'
import css from './archive.module.scss'
import Image from 'next/image'
import { Tags } from './tags'
import { Filter } from './filter'
import { useState } from 'react'
import moment from 'moment'

interface Props {
    event: Event
    videos: Video[]
    className?: string
}

export function Archive(props: Props) {
    const [active, setActive] = useState('')
    const [filtered, setFiltered] = useState(props.videos)
    let className = `${css.container}`
    if (props.className) className += ` ${props.className}`

    let filter: any = {}
    const rooms = [...new Set(props.videos.filter(i => !!i.session?.room).map(i => i.session?.room))] as string[]
    const tracks = [...new Set(props.videos.filter(i => !!i.session?.track).map(i => i.session?.track))] as string[]
    const days = [...new Set(props.videos.filter(i => !!i.session?.start).map(i => moment(i.session?.start).startOf('day').format('MMM DD')))] as string[]
    const tags = [...new Set(props.videos.map(i => i.session?.tags))].flat()

    const showFilterWithOptions = 1
    if (rooms.length > showFilterWithOptions) filter.rooms = rooms
    if (tracks.length > showFilterWithOptions) filter.tracks = tracks
    if (days.length > showFilterWithOptions) filter.days = days

    async function onFilter(filter: any) {
        if ((!filter.rooms || filter.rooms?.length === 0) &&
            (!filter.tracks || filter.tracks?.length === 0) &&
            (!filter.days || filter.days.length === 0)) {
            setFiltered(props.videos)
            return
        }

        const filteredVideos = props.videos.filter(i => {
            if (filter.rooms && filter.rooms.includes(i.session?.room)) return true
            if (filter.tracks && filter.tracks.includes(i.session?.track)) return true
            if (filter.days && filter.days.includes(moment(i.session?.start).startOf('day').format('MMM DD'))) return true

            return false
        })

        setFiltered(filteredVideos)
    }

    return (
        <div className={className}>
            <EventInfoBox event={props.event} />

            {filtered.length === 0 && <div>No videos found</div>}

            {(filter.rooms || filter.tracks || filter.days) && (
                <Filter className={css.filter} filters={filter} onFilter={onFilter} />
            )}

            {filtered.length > 0 && (
                <section className={css.gallery}>
                    {filtered.map((i, index) => {
                        const tags = []
                        if (i.session?.room) tags.push(i.session.room)
                        if (i.session?.track) tags.push(i.session.track)
                        if (i.session?.start && days.length > 1) tags.push(moment(i.session.start).format('MMM DD'))
                        if (i.session?.tags) tags.push(...i.session.tags)

                        const id = `${index}_${i.id}`
                        return <article key={id} className={css.card} id={i.slug} onClick={() => setActive(id)}>
                            <Tags className={css.tags} tags={tags} />
                            {active === id && <video controls autoPlay={true} className={css.video}>
                                <source src={i.url} />
                            </video>}
                            {active !== id && <div className={css.thumbnail}>
                                <Image
                                    src={props.event.poster ?? '/posters/default.png'}
                                    alt={props.event.name}
                                    objectFit="cover"
                                    layout="fill"
                                />
                                <div className={css.play}>
                                    <i className="bi bi-play" />
                                </div>
                            </div>}
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
