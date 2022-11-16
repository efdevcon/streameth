import { Session } from 'types'
import css from './SessionSnack.module.scss'
import { CalendarIcon, VideoCameraIcon, PlayCircleIcon } from '@heroicons/react/24/outline'
import SpeakerIconList from 'components/Speaker/IconList'
import Link from 'next/link'
import { localizedMoment } from 'utils/dateTime'
import LiveIndicator from 'components/LiveIndicator'

export type SessionStatus = 'active' | 'past' | 'normal'

interface Props {
  session: Session
  status?: SessionStatus
  learnMore?: boolean
  isLive?: boolean
  hasRecording?: boolean
}

const formatDateTime = (start: number, end: number) => {
  return `${localizedMoment(start).format('MMMM D / H:mm')}-${localizedMoment(end).format('H:mm')}`
}

export default function SessionSnack({ session, learnMore, status = 'normal', isLive = false, hasRecording = false }: Props) {
  const component = (
    <div className={`${css.container} ${css[status]} ${learnMore ? css['link'] : ''}`}>
      <div className={css.header}>
        <div className={css.header__title}>{session.name}</div>
        <div className={css.header__icon}>
          {(() => {
            if (isLive) {
              return <LiveIndicator />
            } else if (hasRecording) {
              return <PlayCircleIcon className="h-10 w-10 text-gray-600" />
            }
          })()}
        </div>
      </div>
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
          {/* <SpeakerIconList speakers={session.speakers} /> */}
        </div>
      </div>
    </div>
  )

  if (learnMore) return <Link href={'/session/' + session.id}>{component}</Link>

  return component
}
