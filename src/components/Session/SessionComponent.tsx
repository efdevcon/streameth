import React from 'react'
import { SessionContainer } from 'components/Container'
import Image from 'next/image'
import sessionHeader from 'assets/images/session-header.png'
import { Session } from 'types'
import styles from './SessionComponent.module.scss'

interface Props {
  session: Session
}

export default function SessionComponent(props: Props) {
  console.log(props.session)
  return (
    <>
      <div id="header iamge" className="w-full">
        <Image src={sessionHeader} alt="sessionHeader" />
      </div>
      <SessionContainer>
        <div className="flex flex-row">
          <div className="flex flex-col w-full">
            <div className={styles.header}>
              <h2 className={styles.header__title}>{props.session.name}</h2>
            </div>
            <div className={styles.textBox}>
              <p>{props.session.abstract}</p>
            </div>
          </div>
          <div className="flex flex-col w-1/3">
            {props.session.speakers.map((speaker) => (
              <>
                <p>{speaker.name}</p>
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-row"></div>
        <div className="flex flex-row"></div>
      </SessionContainer>
    </>
  )
}
