import React from 'react'
import { Speaker } from 'types'
import styles from './SpeakerBox.module.scss'
import Image from 'next/image'
import defaultAvatar from 'assets/images/default-avatar.png'
interface Props {
  speaker: Speaker
}

export default function SpeakerBox(props: Props) {

  const { speaker } = props
  const {
    name,
    avatarUrl
  } = speaker

  return (
    <div className={styles.box}>
      <div className={styles.box__image}>
        <Image src={avatarUrl ?? defaultAvatar } alt={name}  />
      </div>
      <div className={styles.box__text}>
        <h3 className={styles.box__name}>{name}</h3>
      </div>
    </div>
  )
}
