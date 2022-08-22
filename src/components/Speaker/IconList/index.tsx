import { Speaker } from 'types'
import SpeakerIcon from '../Icon'

interface Props {
  speakers: Speaker[]
}

export default function SpeakerIconList({ speakers }: Props) {
  return (
    <div>
      {speakers.map((speaker) => (
        <SpeakerIcon key={speaker.id} speaker={speaker} />
      ))}
    </div>
  )
}
