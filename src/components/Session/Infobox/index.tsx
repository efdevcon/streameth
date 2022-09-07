import moment from 'moment'
import { Session } from 'types'
import ShareIcon from 'components/Share/Icon'
import css from './SessionInfoBox.module.scss'

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
        <div>Speakers:</div>
      </div>
      <div className={css.box__body}>
        <p className={css.box__description}>{session.description}</p>
        <ShareIcon />
      </div>
    </div>
  )
}
