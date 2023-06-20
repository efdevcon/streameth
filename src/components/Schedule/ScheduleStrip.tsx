import { useState, useEffect } from 'react'
import { useSessions } from 'hooks/useSessions'
import SessionSnack from 'components/Session/Snack'
import { Stage } from 'types'

const ScheduleStrip = ({ time }: { stage?: Stage; time?: number }) => {
  const { sessions } = useSessions([{ type: 'time', value: time }])

  return (
    <div className="flex flex-row overflow-scroll space-x-4 w-full">
      {sessions.map((session) => (
        <div className="flex-1 min-w-[300px]" key={session.id}>
          <SessionSnack session={session} goToStage />
        </div>
      ))}
    </div>
  )
}

export default ScheduleStrip
