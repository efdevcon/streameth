import { Session } from 'types';
import { CalendarIcon, VideoCameraIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import SpeakerIconList from 'components/Speaker/IconList';
import Link from 'next/link';
import { localizedMoment } from 'utils/dateTime';
import LiveIndicator from 'components/LiveIndicator';
import { StatusDot } from '../StatusDot';

export type SessionStatus = 'active' | 'past' | 'normal';

interface Props {
  session: Session;
  status?: SessionStatus;
  learnMore?: boolean;
  isLive?: boolean;
  hasRecording?: boolean;
}

const formatDateTime = (start: number, end: number) => {
  return `${localizedMoment(start).format('MMMM D / H:mm')}-${localizedMoment(end).format('H:mm')}`;
};

export default function SessionSnack({ session, learnMore, status = 'normal', isLive = false, hasRecording = false }: Props) {
  const component = (
    <div className={`rounded-lg border border-gray-200 p-3 bg-white dark:bg-gray-800 space-y-3 ${learnMore ? 'cursor-pointer' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{session.name}</h3>
          <div className="flex items-center space-x-2 mt-2">
            <StatusDot color={status === 'active' ? 'green' : status === 'past' ? 'red' : 'blue'} />
            <span className="text-sm text-gray-500">{status === 'active' ? 'Live' : status === 'past' ? 'Past' : 'Upcoming'}</span>
          </div>
        </div>
        {isLive ? (
          <LiveIndicator />
        ) : hasRecording ? (
          <PlayCircleIcon className="h-6 w-6 text-gray-600" />
        ) : null}
      </div>
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <CalendarIcon className="h-5 w-5 text-gray-600" />
          <span className="text-gray-600 text-sm">{formatDateTime(session.start, session.end)}</span>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <VideoCameraIcon className="h-5 w-5 text-gray-600" />
          <span className="text-gray-600 text-sm">{session.stage.name}</span>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-600 mb-2">Speakers</h4>
        <SpeakerIconList speakers={session.speakers} />
      </div>
    </div>
  );

  if (learnMore) return <Link href={'/session/' + session.id}>{component}</Link>;

  return component;
}
