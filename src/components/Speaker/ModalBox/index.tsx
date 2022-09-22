import { Speaker } from 'types'
import SpeakerIcon from '../Icon'
import styles from './SpeakerModalBox.module.scss'

interface Props {
  speaker?: Speaker
}

export default function SpeakerModalBox({ speaker }: Props) {
  if (!speaker) {
    return null
  }

  return (
    <div className={styles.box}>
      <SpeakerIcon speaker={speaker} size="md" />
      <div className={styles.name}>{speaker.name}</div>
      <div className={styles.description}>{speaker.description}</div>
    </div>
  )
}
