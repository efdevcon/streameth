import LiveIndicator from 'components/LiveIndicator'
import css from './Header.module.scss'

interface Props {
  title: string
  showLive: boolean
}

export default function EventHeader({ title, showLive }: Props) {
  return (
    <div className={css.header}>
      <h1 className={css.header__title}>{title}</h1>
      {showLive && <LiveIndicator />}
    </div>
  )
}
