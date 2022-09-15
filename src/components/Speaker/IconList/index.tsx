import { Speaker } from 'types'
import EthBerlinSpeakerIcon from '../EthBerlin'
import SpeakerIcon from '../Icon'
import css from './SpeakerIconList.module.scss'

interface Props {
  speakers: Speaker[]
  onSpeakerClick?: (speaker: Speaker) => void
}

export default function SpeakerIconList({ speakers, onSpeakerClick }: Props) {
  return (
    <div className={`${css.list} items-center gap-1`}>
      {speakers.map((speaker) => (
        <>
          <EthBerlinSpeakerIcon key={speaker.id} speaker={speaker} />
          {/* <SpeakerIcon key={speaker.id} speaker={speaker} onSpeakerClick={onSpeakerClick} /> */}
          <p>{speaker.name}</p>
        </>
      ))}
    </div>
  )
}
