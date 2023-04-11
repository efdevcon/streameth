import React, { useEffect } from 'react'
import { Session } from 'types'
import Scroll, { Element } from 'react-scroll'
import Image from 'next/image'
import Link from 'next/link'

import SessionSnack from '../Snack'
import styles from './SessionList.module.scss'

interface Props {
  sessions: Session[]
  currentSession?: Session
  isLive: boolean
}

const scroll = Scroll.scroller

function NoSessionComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-gray-600 dark:text-gray-300">No upcoming sessions! Check the archive:</p>
      <Link href="/schedule">
        <a className="text-blue-500 hover:text-blue-600">Archive Page</a>
      </Link>
    </div>
  )
}

export default function SessionList({ sessions, currentSession, isLive }: Props) {
  useEffect(() => {
    if (currentSession) {
      scroll.scrollTo(currentSession.id, {
        duration: 1500,
        smooth: true,
        offset: 0,
        containerId: 'sessionList',
      })
    }
  }, [currentSession])

  return (
    <ul id="sessionList" className={styles.list}>
      {sessions.map((i) => {
        return (
          <Element key={i.id} name={i.id}>
            <li id={i.id} className="mb-3 text-lg">
              <SessionSnack session={i} isLive={isLive} />
            </li>
          </Element>
        )
      })}
      {sessions.length === 0 && <NoSessionComponent />}
    </ul>
  )
}
