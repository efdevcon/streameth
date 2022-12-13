import { useStage } from 'hooks/useStage'
import { useRouter } from 'next/router'
import styles from './StageSelector.module.scss'

export default function StageSelect() {
  const router = useRouter()
  const stage = useStage()


  return (
    <div className="h-full w-full">
      <label htmlFor="stage" className={styles.label}>
        Select Stage
      </label>
      <select
        id="stage"
        name="stage"
        className={styles.select}
        defaultValue={stage.id}
        placeholder="Select Stage"
        onChange={(e) => router.push(`/stage/${e.target.value}`)}>
        {/* {event.stages.map((stage) => {
          return (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          )
        })} */}
      </select>
    </div>
  )
}
