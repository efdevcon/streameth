import React from 'react'
import { Stage } from 'types'
import styles from './FilterNavigation.module.scss'
import Calendar from 'assets/images/calendar.svg'
interface Props {
  stages: Stage['name'][]
  days: string[]
  onStageSelect: (stage: string) => void
  onDaySelect: (day: string) => void
}

function FilterNavigationItem({ title, items, onItemSelect }: { title: string; items: string[] | number[]; onItemSelect: (item: string) => void }) {
  return (
    <div className={styles.filterNavigation__item}>
      <div className={styles.filterNavigation__item__title}>{title}</div>
      <div className={styles.filterNavigation__item__list}>
        {items?.map((item, index) => (
          <div key={index} className={styles.filterNavigation__item__list__item}>
            <input type="checkbox" onChange={() => onItemSelect(item.toString())} className="mr-2" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FilterNavigation(props: Props) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <>
      {isOpen ? (
        <div className={styles.filterNavigation}>
          <div onClick={() => setIsOpen(false)} className={styles.filterNavigation__back_button}>
            x
          </div>
          <div className={styles.filterNavigation__header}>Schedule</div>
          <div>
            <FilterNavigationItem title="Stages" items={props.stages} onItemSelect={props.onStageSelect} />
            <FilterNavigationItem title="Days" items={props.days} onItemSelect={props.onDaySelect} />
          </div>
        </div>
      ) : (
        <div
          className={styles.filterNavigation__slide_button}
          onClick={() => {
            setIsOpen(true)
          }}>
          <Calendar />
        </div>
      )}
    </>
  )
}
