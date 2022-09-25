import { Session, Speaker } from 'types'
import { ShareIcon } from '@heroicons/react/24/outline'
import css from './SessionInfoBox.module.scss'
import SpeakerIconList from 'components/Speaker/IconList'
import { currentTimeInUTC, localizedMoment } from 'utils/dateTime'
import { useStage } from 'hooks/useStage'
import { useSessions } from 'hooks/useSessions'

interface Props {
  session: Session
  onShareClick: () => void
  onSpeakerClick: (speaker: Speaker) => void
}

export default function SessionInfoBox({ session, onShareClick, onSpeakerClick }: Props) {
  const stage = useStage()
  const sessions = useSessions()
  const current = sessions.sessions.find((i) => i.stage === stage.id && localizedMoment(i.start).isAfter(currentTimeInUTC()))
  const currentSession = session

  return (
    <div id="infoBox" className={css.box}>
      <div className={css.box__header}>
        <div className={css.box__date}>
          {localizedMoment(currentSession.start).format('MMM DD / HH:mm')} - {localizedMoment(currentSession.end).format('HH:mm')}
        </div>
        <ShareIcon className={css.box__shareIcon} onClick={onShareClick} />
      </div>
      <div className={css.box__body}>
        <p className={css.box__description}>{currentSession.description || currentSession.abstract}</p>
      </div>
      <div className={css.speakers}>
        <div className={css.speakers__title}>Speakers:</div>
        <SpeakerIconList speakers={currentSession.speakers} onSpeakerClick={onSpeakerClick} />
      </div>
    </div>
  )
}
