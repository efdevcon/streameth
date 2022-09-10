import React, { useEffect } from 'react'
import Container from 'components/Container'
import { Session, Stage } from 'types'
import momemt from 'moment'
import styles from './AllEventsComponent.module.scss'
import FilterNavigation from './FilterNavigation'
import EventCard from './EventCard'

interface Props {
  sessions: Session[]
  stages: Stage['name'][]
  days: string[]
}

export default function SessionComponent(props: Props) {
  const [displayedSessions, setDisplayedSessions] = React.useState(props.sessions)
  const [selectedStage, setSelectedStage] = React.useState<string[]>([])
  const [selectedDay, setSelectedDay] = React.useState<string[]>([])

  const handleSelectedStage = (stage: string) => {
    if (selectedStage?.includes(stage)) {
      setSelectedStage(selectedStage.filter((i) => i !== stage))
    } else {
      setSelectedStage([...selectedStage, stage])
    }
  }

  const handleSelectedDay = (day: string) => {
    if (selectedDay?.includes(day)) {
      setSelectedDay(selectedDay.filter((i) => i !== day))
    } else {
      setSelectedDay([...selectedDay, day])
    }
  }

  useEffect(() => {
    // filter sessions by stage and day
    setDisplayedSessions([
      ...props.sessions.filter((session) => {
        const day = momemt(session.start).format('MMM DD')
        return (selectedStage.length === 0 || selectedStage.includes(session.stage)) && (selectedDay.length === 0 || selectedDay.includes(day))
      }),
    ])
  }, [selectedStage, selectedDay])

  return (
    <div className={styles.layout}>
      <div className={styles.layout__filter}>
        <FilterNavigation stages={props.stages} days={props.days} onStageSelect={handleSelectedStage} onDaySelect={handleSelectedDay} />
      </div>
      <div className={styles.layout__content}>
        <Container>
          <div className={styles.layout__content__grid}>
            {displayedSessions.map((session) => (
              <EventCard key={session.id} session={session} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  )
}
