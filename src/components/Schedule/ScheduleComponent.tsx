import React, { useEffect } from 'react'
import Container from 'components/Container'
import { Session, Stage } from 'types'
import momemt from 'moment'
import styles from './ScheduleComponent.module.scss'
import FilterNavigation from './FilterNavigation'
import SessionSnack from 'components/Session/Snack'
interface Props {
  sessions: Session[]
  stages: Stage['name'][]
  days: string[]
}

export default function SessionComponent(props: Props) {
  const [displayedSessions, setDisplayedSessions] = React.useState(props.sessions)
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])

  const handleSelectedItems = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  useEffect(() => {
    console.log(selectedItems)
    // filter sessions by stage and day
    setDisplayedSessions([
      ...props.sessions.filter((session) => {
        const day = momemt(session.start).format('MMM DD')
        const noStageSelected = selectedItems.filter((item) => props.stages.includes(item)).length === 0
        const noDaySelected = selectedItems.filter((item) => props.days.includes(item)).length === 0
        if (noStageSelected && noDaySelected) {
          return true
        }
        if (noStageSelected) {
          return selectedItems.includes(day)
        }
        if (noDaySelected) {
          return selectedItems.includes(session.stage ?? '')
        }
        return selectedItems.includes(session.stage ?? '') && selectedItems.includes(day)
      }),
    ])
  }, [selectedItems])

  return (
    <div className={styles.layout}>
      <div className={styles.layout__filter}>
        <FilterNavigation stages={props.stages} days={props.days} onSelect={handleSelectedItems} selectedItems={selectedItems} />
      </div>
      <div className={styles.layout__content}>
        <Container>
          <div className={styles.layout__content__grid}>
            {displayedSessions.map((session) => (
              <SessionSnack key={session.id} session={session} learnMore />
            ))}
          </div>
        </Container>
      </div>
    </div>
  )
}
