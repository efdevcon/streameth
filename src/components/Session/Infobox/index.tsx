import { Session, Speaker } from 'types'
import { ShareIcon } from '@heroicons/react/24/outline'
import { useStage } from 'hooks/useStage'
import { useSessions } from 'hooks/useSessions'

interface Props {
  session: Session
  onShareClick: () => void
  onSpeakerClick: (speaker: Speaker) => void
  onEmbedClick: () => void
}

export default function SessionInfoBox({ session, onShareClick, onSpeakerClick, onEmbedClick }: Props) {
  const stage = useStage()
  const sessions = useSessions()
  const currentSession = session

  return (
    <div className="bg-white px-3 border border-transparent py-2 space-y-2 dark:bg-black">
      {/* <div className={css.box__header}>
        <div className={css.box__date}>
          {localizedMoment(currentSession.start).format('MMM DD / HH:mm')} - {localizedMoment(currentSession.end).format('HH:mm')}
        </div>
      </div> */}
      <div className="py-2 flex justify-between items-center dark:text-gray-400">
        <p className="text-xl font-medium">{`${stage.name} stage: ${currentSession.name}`}</p>
        <span className=" p-1 cursor-pointer text-gray-600 border-2 rounded-lg ml-auto dark:text-gray-300" onClick={onEmbedClick}>
          embed
        </span>
        <ShareIcon className="h-8 w-8 cursor-pointer text-gray-600 ml-3 dark:text-gray-300" onClick={onShareClick} />
      </div>
      {/* <div className={css.speakers}>
        <div className={css.speakers__title}>Speakers:</div>
        <SpeakerIconList speakers={currentSession.speakers} onSpeakerClick={onSpeakerClick} />
      </div> */}
    </div>
  )
}
