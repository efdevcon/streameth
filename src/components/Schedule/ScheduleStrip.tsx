import { useState, useEffect } from 'react'
import { useSessions } from 'hooks/useSessions'
import SessionSnack from 'components/Session/Snack'
import { Stage } from 'types'

const ScheduleStrip = ({ stage, time }: { stage?: Stage; time?: number }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { sessions, addOrUpdateFilter } = useSessions()

  useEffect(() => {
    time &&
      addOrUpdateFilter({
        type: 'time',
        value: time,
      })

    stage &&
      addOrUpdateFilter({
        type: 'stage',
        value: stage,
      })

    setIsLoading(false)
  }, [addOrUpdateFilter, time, stage])

  return (
    <div className="flex flex-row overflow-scroll space-x-4">
      {sessions.map((session) => (
        <div className="flex-1 min-w-[350px]" key={session.id}>
          <SessionSnack session={session} learnMore />
        </div>
      ))}
    </div>
  )
}

export default ScheduleStrip
