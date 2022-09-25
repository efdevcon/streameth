import StageSelector from 'components/Stage/Selector'
import { TimeState } from 'hooks/useSessions'
import { Session } from 'types'
import SessionList from '../Session/List'
import styles from './Sidebar.module.scss'

interface Props {
  timeState: TimeState
  sessions: Session[]
  currentSession: Session
  isLive: boolean
  height: number | 'auto'
}

export default function Sidebar({ timeState, sessions, currentSession, isLive, height }: Props) {
  return (
    <div id="sidebar" className={styles.sidebar} style={{ height }}>
      <h3 className="text-2xl font-bold dark:text-white">Schedule</h3>
      <StageSelector />
      <SessionList timeState={timeState} sessions={sessions} currentSession={currentSession} isLive={isLive} />
    </div>
  )
}
