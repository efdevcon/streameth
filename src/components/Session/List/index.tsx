import { Session } from 'types'
import type { TimeState } from 'hooks/useSessions'
import type { SessionStatus } from '../Snack'
import Scroll, { Element } from 'react-scroll'
import SessionSnack from '../Snack'
import styles from './SessionList.module.scss'
import { useEffect } from 'react'

interface Props {
  sessions: Session[]
  currentSession?: Session
  timeState: TimeState
}

const scroll = Scroll.scroller

export default function SessionList({ timeState, sessions, currentSession }: Props) {
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
        let sessionStatus: SessionStatus = 'normal'

        if (timeState === 'DURING_DAY' && currentSession) {
          if (i.start < currentSession.start) {
            sessionStatus = 'past'
          }

          if (i.id === currentSession.id) {
            sessionStatus = 'active'
          }
        }

        return (
          <Element key={i.id} name={i.id}>
            <li id={i.id} className="mb-3 text-lg">
              <SessionSnack session={i} status={sessionStatus} />
            </li>
          </Element>
        )
      })}
    </ul>
  )
}
