import { useState, useEffect, useMemo, useCallback } from 'react'
import { Session, Filter, PossibleFilter, TimeState } from 'types'
import { startOfDay, currentTimeInUTC } from 'utils/dateTime'
import useInterval from '@use-it/interval'
import { useContext } from 'react'
import { EventContext } from 'context/event-context'

export function useSessions(initFilters: Filter[] = []) {
  const context = useContext(EventContext)

  if (context === undefined) {
    throw new Error('useStage must be used within an EventContextProvider')
  }

  if (!context.sessions) {
    throw new Error('No sessions found')
  }

  const allSessions = context.sessions
  const [timeState, setTimeState] = useState<TimeState>('DURING_DAY')
  const [currentSession, setCurrentSession] = useState<Session>(allSessions[0])
  const [eventDayNum, setEventDayNum] = useState<number | null>(null)
  const [filters, setFilters] = useState<Filter[]>(initFilters)
  const eventDays = [...new Set(allSessions.map((i) => startOfDay(i.start)))].sort()
  const stages = [...new Set(allSessions.map((i) => i.stage))].sort()
  const speakers = [...new Set(allSessions.map((i) => i.speakers.map((s) => s.name)).flat())].sort()

  const possibleFilters: PossibleFilter[] = useMemo(() => {
    return [
      {
        type: 'day',
        value: eventDays,
      },
      {
        type: 'stage',
        value: stages,
      },
      {
        type: 'speaker',
        value: speakers,
      },
      {
        type: 'recording',
        value: ['yes', 'no'],
      },
    ]
  }, [eventDays, stages, speakers])

  const sessions = useMemo(() => {
    let filteredSessions = [...allSessions]
    return filteredSessions
      .filter((session) => {
        if (filters.length === 0) {
          return true
        }
        return filters.some((filter) => {
          switch (filter.type) {
            case 'day':
              return startOfDay(session.start) === filter.value
            case 'stage':
              return session.stage === filter.value
            case 'recording':
              return filter.value === 'yes' ? !!session.video : !session.video
            case 'speaker':
              return session.speakers.some((speaker) => speaker.name === filter.value)
            default:
              return false
          }
        })
      })
      .sort((a: any, b: any) => a.start - b.start)
  }, [allSessions, filters])

  // Determines when the user visits the website in relation to the event
  // Different timeStates are:
  //   - BEFORE_EVENT (before event starts)
  //   - DURING_DAY (during an event day)
  //   - BEFORE_NEXT_DAY (after all sessions in event day, but before event end)
  //   - AFTER_EVENT (after event end)
  // Also sets currentSession, which determines what session to initially show
  const calcTimeState = useCallback(() => {
    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i]
      const startTime = session.start
      const endTime = session.end
      const currentTime = currentTimeInUTC()

      if (currentTime.isBefore(startTime) && i === 0) {
        setCurrentSession(session)
        break
      } else if (currentTime.isBefore(endTime)) {
        setCurrentSession(session)

        if (startOfDay(currentTime) === startOfDay(endTime)) {
          setTimeState('DURING_DAY')
        } else {
          setTimeState('BEFORE_NEXT_DAY')
        }
        break
      } else if (i === sessions.length - 1) {
        setTimeState('AFTER_EVENT')
        setCurrentSession(sessions[0])
      }
    }
  }, [sessions])

  useEffect(() => {
    calcTimeState()
  }, [calcTimeState])

  // determine event day number if during event
  useEffect(() => {
    if (eventDays.length > 1) {
      for (let i = 0; i < eventDays.length; i++) {
        const day = eventDays[i]

        if (day === startOfDay(currentTimeInUTC())) {
          setEventDayNum(i + 1)
          break
        }
      }
    }
  }, [eventDays])

  // update time every minute and determine timeState
  // stop when timeState === BEFORE_NEXT_DAY or AFTER_EVENT
  useInterval(
    () => {
      calcTimeState()
    },
    ['BEFORE_NEXT_DAY', 'AFTER_EVENT'].includes(timeState) ? null : 60000 // time in ms
  )

  const addOrUpdateFilter = (filter: Filter) => {
    const { value } = filter
    const index = filters.findIndex((f) => f.value === value)
    if (index === -1) {
      setFilters([...filters, filter])
    } else {
      // remove filter if already exists
      const newFilters = [...filters]
      newFilters.splice(index, 1)
      setFilters(newFilters)
    }
  }

  return {
    timeState,
    currentSession,
    eventDayNum,
    sessions,
    addOrUpdateFilter,
    setFilters,
    filters,
    possibleFilters,
  }
}
