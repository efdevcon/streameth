import { useState, useEffect } from 'react'
import { useSessions } from 'hooks/useSessions'
import SessionSnack from 'components/Session/Snack'
import { Stage } from 'types'

const ScheduleStrip = ({ stage }: { stage: Stage }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { sessions, addOrUpdateFilter } = useSessions()
  useEffect(() => {
    addOrUpdateFilter({
      type: 'stage',
      value: stage.id,
    })
    setIsLoading(false)
  }, [addOrUpdateFilter, stage])

  return (
    <div className="p-4">
      <p className="text-xl bold bg-black opacity-80 text-white w-1/3 h-10 flex flex-col justify-center p-4 align-middle my-2">{stage.name}</p>
      <div className="flex flex-row overflow-scroll space-x-4 ">
        {sessions.map((session) => (
          <SessionSnack key={session.id} session={session} learnMore />
        ))}
      </div>
    </div>
  )
}

export default ScheduleStrip
