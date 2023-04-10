import { Session, Speaker } from 'types'
import { ShareIcon } from '@heroicons/react/24/outline'
import { useStage } from 'hooks/useStage'

interface Props {
  session: Session
  onShareClick: () => void
  onSpeakerClick: (speaker: Speaker) => void
  onEmbedClick: () => void
}

const SessionInfoBox: React.FC<Props> = ({ session, onShareClick, onEmbedClick }) => {
  const stage = useStage()

  return (
    <div className="bg-white px-3 border border-transparent py-2 space-y-2 dark:bg-black">
      <div className="py-2 flex justify-between items-center dark:text-gray-400">
        <p className="text-xl font-medium">{`${stage.name} stage: ${session.name}`}</p>
        <span className="p-1 cursor-pointer text-gray-600 border-2 rounded-lg ml-auto dark:text-gray-300" onClick={onEmbedClick}>
          embed
        </span>
        <ShareIcon className="h-8 w-8 cursor-pointer text-gray-600 ml-3 dark:text-gray-300" onClick={onShareClick} />
      </div>
    </div>
  )
}

export default SessionInfoBox
