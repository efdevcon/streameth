import LiveIndicator from 'components/LiveIndicator'
import css from './Header.module.scss'

interface Props {
  eventName: string
  showLive: boolean
}

export default function EventHeader({ eventName, showLive }: Props) {
  return (
    <div className={css.header}>
      <h1 className={css.header__title}>{eventName}</h1>
      {showLive && <LiveIndicator />}
    </div>
  )
}
