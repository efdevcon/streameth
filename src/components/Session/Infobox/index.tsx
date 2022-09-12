import moment from 'moment'
import { Session } from 'types'
import ShareIcon from 'components/Share/Icon'
import css from './SessionInfoBox.module.scss'
import SpeakerIconList from 'components/Speaker/IconList'

interface Props {
  session: Session
}

export default function SessionInfoBox({ session }: Props) {
  return (
    <div className={css.box}>
      <div className={css.box__header}>
        <div className={css.box__date}>
          {moment(session.start).format('MMM DD / HH:mm')} - {moment(session.end).format('HH:mm')}
        </div>
        <div className="flex align-items">
          <div className="mr-1 leading-none">Speakers:</div>
          <SpeakerIconList speakers={session.speakers} />
        </div>
      </div>
      <div className={css.box__body}>
        <p className={css.box__description}>{session.description || session.abstract}</p>
        <ShareIcon />
      </div>
    </div>
  )
}
