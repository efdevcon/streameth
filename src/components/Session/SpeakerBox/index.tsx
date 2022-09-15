import React from 'react'
import { Speaker } from 'types'
import styles from './SpeakerBox.module.scss'
import SpeakerIcon from 'components/Speaker/Icon'
import SpeakerModalBox from 'components/Speaker/ModalBox'
import Modal from 'components/Modal'
import EthBerlinSpeakerIcon from 'components/Speaker/Icon/EthBerlin'

interface Props {
  speaker: Speaker
}

export default function SpeakerBox(props: Props) {
  const { speaker } = props
  const { name, avatarUrl } = speaker
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <SpeakerModalBox speaker={speaker} />
        </Modal>
      )}
      <div className={styles.box} onClick={() => setIsOpen(true)}>
        {/* <SpeakerIcon speaker={speaker} /> */}
        <EthBerlinSpeakerIcon speaker={speaker} />
        <div className={styles.box__text}>
          <h3 className={styles.box__name}>{name}</h3>
        </div>
      </div>
    </>
  )
}
