import { useState, useEffect, useMemo, useCallback } from 'react'
import { Session, Event } from 'types'
import { pickBy } from 'lodash'
import { startOfDay, currentTimeInUTC } from 'utils/dateTime'
import useInterval from '@use-it/interval'
import { useEvent } from './useEvent'

interface Filter {
  type: 'stage' | 'day'
  value: [any]
}

export type TimeState = 'BEFORE_EVENT' | 'DURING_DAY' | 'BEFORE_NEXT_DAY' | 'AFTER_EVENT'

export function useSessions(initFilters: Filter[] = []) {
  const event = useEvent()
  const allSessions = useMemo(() => {
    return event.schedule.sessions.sort((a: any, b: any) => a.start - b.start)
  }, [event])
  const eventDays = useMemo(() => {
    return [...new Set(allSessions.map((i) => startOfDay(i.start)))].sort()
  }, [allSessions])
  // const groupedSessions = useMemo(() => {
  //   const groups: { [key: number]: { [key: string]: Session[] } } = {}

  //   for (let i = 0; i < allSessions.length; i++) {
  //     const session = allSessions[i]
  //     const day = startOfDay(session.start)
  //     const stage = session.stage
  //     let dayGroup = groups[day]

  //     if (!stage) {
  //       continue;
  //     }

  //     if (dayGroup) {
  //       let dayStageGroup = groups[day][stage]

  //       if (dayStageGroup) {
  //         dayStageGroup.push(session)
  //       } else {
  //         groups[day][stage] = [session]
  //       }
  //     } else {
  //       groups[day] = { [stage]: [session] }
  //     }
  //   }
  //   return groups
  // }, [allSessions])
  const [timeState, setTimeState] = useState<TimeState>('DURING_DAY')
  const [currentSession, setCurrentSession] = useState<Session>(allSessions[0])
  const [activeSessions, setActiveSessions] = useState<Session[]>([])
  const [eventDayNum, setEventDayNum] = useState<number>(1)
  const [filters, setFilters] = useState<Filter[]>(initFilters)


  // const sessions = useMemo(() => {
  //   let filteredSessions = { ...groupedSessions }

  //   if (filters.length > 0) {
  //     for (let i = 0; i < filters.length; i++) {
  //       const filter = filters[i]
  //       const { type, value } = filter

  //       if (type === 'day') {
  //         for (const day in filteredSessions) {
  //           if (!value.includes(eventDays.indexOf(Number(day)) + 1)) {
  //             delete filteredSessions[day]
  //           }
  //         }
  //       }

  //       if (type === 'stage') {
  //         for (const day in filteredSessions) {
  //           const dayGroup = filteredSessions[day]

  //           for (const stage in dayGroup) {
  //             if (!value.includes(stage)) {
  //               delete dayGroup[stage]
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  //   return filteredSessions
  // }, [groupedSessions, filters, eventDays])

  const sessions = useMemo(() => {
    let filteredSessions = [...allSessions]

    if (filters.length > 0) {
      return filteredSessions.filter((session) => {
        for (let i = 0; i < filters.length; i++) {
          const filter = filters[i]
          const { type, value } = filter

          if (type === 'stage' && value.includes(session.stage)) {
            return true
          }

          // eventDayNum is only set during the event; otherwise it is null
          // When null, use value of 0 to check the first day in eventDays
          // Otherwise, subtract 1 from eventDayNum to get corresponding index in eventDays
          if (
            type === 'day' &&
            value.includes(eventDays.indexOf(startOfDay(session.start)) + 1)
          ) {
            return true
          }
        }

        return false
      })
    }

    return filteredSessions
  }, [allSessions, filters, eventDays])

  // Determines when the user visits the website in relation to the event
  // Different timeStates are:
  //   - BEFORE_EVENT (before event starts)
  //   - DURING_DAY (during an event day)
  //   - BEFORE_NEXT_DAY (after all sessions in event day, but before event end)
  //   - AFTER_EVENT (after event end)
  // Also sets currentSession, which determines what session to initially show
  const calcTimeState = useCallback(
    () => {
      for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i]
        const startTime = session.start
        const endTime = session.end
        const currentTime = currentTimeInUTC()

        if (currentTime.isBefore(startTime) && i === 0) {
          setTimeState('BEFORE_EVENT')
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
    },
    [sessions]
  )

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
  useInterval(() => {
    calcTimeState()
  },
    ['BEFORE_NEXT_DAY', 'AFTER_EVENT'].includes(timeState) ? null : 60000 // time in ms
  )

  return {
    timeState,
    currentSession,
    eventDayNum,
    sessions,
    // addOrUpdateFilter,
    setFilters
  }
}
