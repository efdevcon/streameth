import React, { useEffect } from 'react'
import Container from 'components/Container'
import { Session, Stage } from 'types'
import styles from './AllEventsComponent.module.scss'
import FilterNavigation from './FilterNavigation'
import momemt from 'moment'
interface Props {
  sessions: Session[]
  stages: Stage['name'][]
  days: number[]
}

export default function SessionComponent(props: Props) {
  const [displayedSessions, setDisplayedSessions] = React.useState(props.sessions)
  const [selectedStage, setSelectedStage] = React.useState<string | null>('Main')
  const [selectedDay, setSelectedDay] = React.useState<string | null>('16')

  useEffect(() => {
    //filter sessions by stage and day
    setDisplayedSessions([
      ...props.sessions.filter((session) => {
        const day = momemt(session.start).format('DD')
        return (!selectedStage || session.stage === selectedStage) && (!selectedDay || day === selectedDay)
      }),
    ])
  }, [selectedStage, selectedDay])

  return (
    <div className={styles.layout}>
      <FilterNavigation stages={props.stages} days={props.days} onStageSelect={setSelectedStage} onDaySelect={setSelectedDay} />
      <Container>
        {displayedSessions.map((session) => (
          <div key={session.id}>
            <h2>{session.name}</h2>
            <p>{session.speakers[0].name}</p>
          </div>
        ))}
      </Container>
    </div>
  )
}
