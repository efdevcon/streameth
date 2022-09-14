import { useEvent } from 'hooks/useEvent'
import { useStage } from 'hooks/useStage'
import { useRouter } from 'next/router'
import styles from './StageSelector.module.scss'

export default function StageSelect() {
  const router = useRouter()
  const event = useEvent()
  const stage = useStage()

  if (event.stream.stages.length <= 1) return <></>

  return (
    <div>
      <select
        id="stage"
        name="stage"
        className={styles.select}
        defaultValue={stage.id}
        placeholder="Select Stage"
        onChange={(e) => router.push(`/stage/${e.target.value}`)}>
        {event.stream.stages.map((stage) => {
          return (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}
