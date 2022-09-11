import { Speaker } from 'types'
import css from './SpeakerIcon.module.scss'

interface Props {
  speaker: Speaker
}

const initials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
}

export default function SpeakerIcon({ speaker }: Props) {
  return (
    <div className={css.icon} style={{ backgroundImage: `url('${speaker.avatarUrl}')` }}>
      {!speaker.avatarUrl && <span>{initials(speaker.name)}</span>}
    </div>
  )
}
