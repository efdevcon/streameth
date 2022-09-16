import { Speaker } from 'types'
import css from './ethberlin.module.scss'

interface Props {
  size?: 'sm' | 'md'
  speaker: Speaker
}

export default function EthBerlinSpeakerIcon({ speaker, size = 'sm' }: Props) {
  return (
    <div className={`${css[size]} shrink-0`}>
      <img src={`/ethberlin/${speaker.name.charAt(0)}.png`} className="rounded-full" />
    </div>
  )
}
