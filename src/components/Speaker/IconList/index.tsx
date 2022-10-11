import { Speaker } from 'types'
import SpeakerIcon from '../Icon'
import css from './SpeakerIconList.module.scss'

interface Props {
  rows?: boolean
  speakers: Speaker[]
  onSpeakerClick?: (speaker: Speaker) => void
}

export default function SpeakerIconList(props: Props) {
  return (
    <div className={`${css.list} ${props.rows ? 'flex-row' : 'flex-col'} gap-2`}>
      {props.speakers.map((speaker) => (
        <div key={speaker.id} className={`${props.onSpeakerClick ? css.speaker : ''} flex flex-row gap-2`} onClick={() => props.onSpeakerClick ? props.onSpeakerClick(speaker) : ''}>
          <SpeakerIcon key={speaker.id} speaker={speaker} />
          <p>{speaker.name}</p>
        </div>
      ))}
    </div>
  )
}
