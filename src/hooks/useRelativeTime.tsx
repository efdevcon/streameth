import { useState, useEffect } from 'react'
import { Event, Session } from 'types'
import { startOfDay, currentTimeInUTC } from 'utils/dateTime'
import useInterval from '@use-it/interval'

// Determines when the user visits the website in relation to the event
// Different timeStates are:
//   - BEFORE_EVENT (before event starts)
//   - DURING_DAY (during an event day)
//   - BEFORE_NEXT_DAY (after all sessions in event day, but before event end)
//   - AFTER_EVENT (after event end)
export function useRelativeTime(event: Event) {
  const [currentTimeUTC, setCurrentTimeUTC] = useState(currentTimeInUTC())
  const [timeState, setTimeState] = useState<'BEFORE_EVENT' | 'DURING_DAY' | 'BEFORE_NEXT_DAY' | 'AFTER_EVENT'>('BEFORE_EVENT')
  const [currentSession, setCurrentSession] = useState<Session | null>(null)
  const [eventDayNum, setEventDayNum] = useState<number | null>(null)
  const sessions = event?.schedule?.sessions || []
  const eventDays = [...new Set(sessions.map((i) => startOfDay(i.start)))].sort()

  useEffect(() => {
    if (eventDays.length > 1) {
      for (let i = 0; i < eventDays.length; i++) {
        const day = eventDays[i]

        if (day === startOfDay(currentTimeUTC)) {
          setEventDayNum(i + 1)
          break
        }
      }
    }
  }, [currentTimeUTC, eventDays])

  const calcTimeState = () => {
    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i]
      const startTime = session.start
      const endTime = session.end

      if (currentTimeUTC.isBefore(startTime) && i === 0) {
        setCurrentSession(session)
        break
      } else if (currentTimeUTC.isBefore(endTime)) {
        setCurrentSession(session)

        if (startOfDay(currentTimeUTC) === startOfDay(endTime)) {
          setTimeState('DURING_DAY')
        } else {
          setTimeState('BEFORE_NEXT_DAY')
        }
      } else if (i === sessions.length - 1) {
        setTimeState('AFTER_EVENT')
        setCurrentSession(sessions[0])
      }
    }
  }

  // update time every minute and determine timeState
  useInterval(
    () => {
      setCurrentTimeUTC(currentTimeInUTC())
      calcTimeState()
    },
    ['BEFORE_NEXT_DAY', 'AFTER_EVENT'].includes(timeState) ? null : 60000
  )

  return {
    timeState,
    currentSession,
    eventDayNum,
  }
}
