import React from 'react'
import { Speaker } from 'types'
import styles from './SpeakerBox.module.scss'
import Image from 'next/image'
import defaultAvatar from 'assets/images/default-avatar.png'
interface Props {
  speaker: Speaker
}

export function SpeakerModal({ speaker, onClose }: { speaker: Speaker; onClose: () => void }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div className={styles.modal__close} onClick={onClose}>
          X
        </div>
        <div className={styles.modal__header}>
          <div className={styles.modal__header__image}>
            <Image src={speaker.avatarUrl ?? defaultAvatar} alt="avatar" width={100} height={100} />
          </div>
            <h2 className={styles.modal__header__text}>{speaker.name}</h2>
        </div>
        <div className={styles.modal__body}>
          <p>{speaker.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function SpeakerBox(props: Props) {
  const { speaker } = props
  const { name, avatarUrl } = speaker
  const [isOpen, setIsOpen] = React.useState(false)


  return (
    <>
    {isOpen && <SpeakerModal speaker={speaker} onClose={() => setIsOpen(false)} />}
    <div className={styles.box} onClick={() => setIsOpen(true)}>
      <div className={styles.box__image}>
        <Image src={avatarUrl ?? defaultAvatar} alt={name} />
      </div>
      <div className={styles.box__text}>
        <h3 className={styles.box__name}>{name}</h3>
      </div>
    </div>
    </>
  )
}
