import { Speaker } from 'types'
import SpeakerIcon from '../Icon'
import css from './SpeakerIconList.module.scss'

interface Props {
  speakers: Speaker[]
}

export default function SpeakerIconList({ speakers }: Props) {
  return (
    <div className={css.list}>
      {speakers.map((speaker) => (
        <SpeakerIcon key={speaker.id} speaker={speaker} />
      ))}
    </div>
  )
}
