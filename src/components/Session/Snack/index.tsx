import { Session } from 'types'
import { CalendarIcon, VideoCameraIcon, PlayCircleIcon } from '@heroicons/react/24/outline'
import SpeakerIconList from 'components/Speaker/IconList'
import Link from 'next/link'
import { localizedMoment } from 'utils/dateTime'
import LiveIndicator from 'components/LiveIndicator'
import { StatusDot } from '../StatusDot'

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

export default function SessionSnack({ session, learnMore, isLive = false, hasRecording = false }: Props) {
  const component = (
    <div className={`border p-4 h-full bg-white space-y-3 hover:shadow-lg ${learnMore ? 'cursor-pointer' : ''}`}>
      <div className="flex flex-col justify-between items-start">
        <div className="flex items-center mb-1 w-full">
          <span className="font-thin">{session.stage.name}</span>
          {session.status == 'LIVE' && <StatusDot />}
        </div>
        <p className="text-xl font-bold">{session.name}</p>
        {isLive ? <LiveIndicator /> : hasRecording ? <PlayCircleIcon className="h-6 w-6 text-gray-600" /> : null}
      </div>
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text text-gray-400 text-md font-thin">{formatDateTime(session.start, session.end)}</span>
        </div>
      </div>
      <div>
        <SpeakerIconList speakers={session.speakers} />
      </div>
    </div>
  )

  if (learnMore) return <Link href={'/session/' + session.id}>{component}</Link>

  return component
}
