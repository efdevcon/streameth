import { Session, Speaker } from 'types'
import { ShareIcon } from '@heroicons/react/24/outline'
import { localizedMoment } from 'utils/dateTime'

interface Props {
  session: Session
  onShareClick: () => void
  onSpeakerClick: (speaker: Speaker) => void
  onEmbedClick: () => void
}

const SessionInfoBox: React.FC<Props> = ({ session, onShareClick, onEmbedClick }) => {
  return (
    <div className="bg-white px-3 border border-transparent py-2 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-xl font-medium">{`${session?.name}`}</p>
          <p className="text-xl font-thin">{`${localizedMoment(session?.start).format('HH:mm')} - ${localizedMoment(session?.end).format('HH:mm')}`}</p>
        </div>
        <span className="p-1 cursor-pointer text-black border-black border-2  ml-auto" onClick={onEmbedClick}>
          embed
        </span>
        <ShareIcon className="h-8 w-8 cursor-pointer text-gray-600 ml-3 dark:text-gray-300" onClick={onShareClick} />
      </div>
    </div>
  )
}

export default SessionInfoBox
