import { Speaker } from 'types'
import { CreateBlockie } from 'utils/avatars'
import css from './SpeakerIcon.module.scss'

interface Props {
  speaker: Speaker
  size?: 'sm' | 'md'
  onSpeakerClick?: (speaker: Speaker) => void
}

const initials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
}

export default function SpeakerIcon({ speaker, onSpeakerClick, size = 'sm' }: Props) {
  const avatar = speaker.avatarUrl ?? CreateBlockie(speaker.name)
  return (
    <div
      onClick={() => onSpeakerClick?.(speaker)}
      className={`${css.icon} ${css[size]} ${onSpeakerClick ? css.pointer : ''}`}
      style={{ backgroundImage: `url('${avatar}')` }}>
    </div>
  )
}
