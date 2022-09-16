import { Session } from 'types'
import css from './SessionSnack.module.scss'
import { CalendarIcon, VideoCameraIcon } from '@heroicons/react/outline'
import SpeakerIconList from 'components/Speaker/IconList'
import Link from 'next/link'
import { localizedMoment } from 'utils/dateTime'

export type SessionStatus = 'active' | 'past' | 'normal'

interface Props {
  session: Session
  status?: SessionStatus
  learnMore?: boolean
}

const formatDateTime = (start: number, end: number) => {
  return `${localizedMoment(start).format('MMMM D / H:mm')}-${localizedMoment(end).format('H:mm')}`
}

export default function SessionSnack({ session, learnMore, status = 'normal' }: Props) {
  const component = <div className={`${css.container} ${css[status]} ${learnMore ? css['link'] : ''}`}>
    <div className={css.title}>{session.name}</div>
    <div className={css.body}>
      <div>
        <div className={css.iconText}>
          <CalendarIcon />
          <span>{formatDateTime(session.start, session.end)}</span>
        </div>
        <div className={css.iconText}>
          <VideoCameraIcon />
          <span>{session.stage}</span>
        </div>
      </div>
      <div className="flex">
        <SpeakerIconList speakers={session.speakers} />
      </div>
    </div>
  </div>

  if (learnMore)
    return <Link href={'/session/' + session.id}>
      {component}
    </Link>

  return component
}
