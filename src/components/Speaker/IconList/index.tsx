import { Speaker } from 'types'
import SpeakerIcon from '../Icon'

interface Props {
  speakers: Speaker[]
  onSpeakerClick?: (speaker: Speaker) => void
}

export default function SpeakerIconList({ speakers, onSpeakerClick }: Props) {
  return (
    <div className={`flex flex-col gap-2`}>
      {speakers.map((speaker) => (
        <div key={speaker.id} className='flex flex-row gap-2'>
          <SpeakerIcon key={speaker.id} speaker={speaker} onSpeakerClick={onSpeakerClick} />
          <p>{speaker.name}</p>
        </div>
      ))}
    </div>
  )
}
