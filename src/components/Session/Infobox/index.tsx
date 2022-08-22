import moment from 'moment'
import { Session } from 'types'
import ShareIcon from 'components/Share/Icon'
import css from './SessionInfoBox.module.scss'

interface Props {
  session: Session
}

const formatDate = (start: string, end: string) => {
  const d = moment(start).format('MMM DD / HH:mm')

  return d
}

export default function SessionInfoBox({ session }: Props) {
  return (
    <div className={css.box}>
      <div className={css.box__header}>
        <div className={css.box__date}>{formatDate(session.start, session.end)}</div>
        <div>Speakers:</div>
      </div>
      <div className={css.box__body}>
        <p className={css.box__description}>{session.description}</p>
        <ShareIcon />
      </div>
    </div>
  )
}
