import { Session, Speaker } from 'types'
import { ShareIcon } from '@heroicons/react/outline'
import css from './SessionInfoBox.module.scss'
import SpeakerIconList from 'components/Speaker/IconList'
import { localizedMoment } from 'utils/dateTime'

interface Props {
  session: Session
  onShareClick: () => void
  onSpeakerClick: (speaker: Speaker) => void
}

export default function SessionInfoBox({ session, onShareClick, onSpeakerClick }: Props) {
  return (
    <div className={css.box}>
      <div className={css.box__header}>
        <div className={css.box__date}>
          {localizedMoment(session.start).format('MMM DD / HH:mm')} - {localizedMoment(session.end).format('HH:mm')}
        </div>
        <ShareIcon className={css.box__shareIcon} onClick={onShareClick} />
      </div>
      <div className={css.box__body}>
        <p className={css.box__description}>{session.description || session.abstract}</p>
      </div>
      <div className={css.speakers}>
        <div className={css.speakers__title}>Speakers:</div>
        <SpeakerIconList speakers={session.speakers} onSpeakerClick={onSpeakerClick} />
      </div>
    </div>
  )
}
