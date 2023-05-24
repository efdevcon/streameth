import { useState, useMemo, useCallback } from 'react'
import { Filter, PossibleFilter, SessionStatus } from 'types'
import { startOfDay, currentTimeInUTC, localizedMoment } from 'utils/dateTime'
import { useContext } from 'react'
import { PageContext } from 'context/page-context'

export function useSessions(initFilters: Filter[] = []) {
  const context = useContext(PageContext)

  if (context === undefined) {
    throw new Error('useSession must be used within an EventContextProvider')
  }

  if (!context.sessions) {
    throw new Error('No sessions found')
  }

  const allSessions = context.sessions
  const [filters, setFilters] = useState<Filter[]>(initFilters)
  const eventDays = [...new Set(allSessions.map((i) => startOfDay(i.start)))].sort()
  const stages = [...new Set(allSessions.map((i) => i.stage.id))].sort()
  const speakers = [...new Set(allSessions.map((i) => i.speakers.map((j) => j.name)).flat())].sort()
  const tracks = [...new Set(allSessions.map((i) => i.track))].sort()
  const possibleFilters: PossibleFilter[] = useMemo(() => {
    return [
      {
        type: 'day',
        value: eventDays,
      },
      {
        type: 'track',
        value: tracks,
      },
      {
        type: 'stage',
        value: stages,
      },
      {
        type: 'speaker',
        value: speakers,
      },
    ]
  }, [eventDays, stages, speakers, tracks])

  const getSessionStatus = (start: Date, end: Date): SessionStatus => {
    const currentTime = currentTimeInUTC()

    if (currentTime.isBefore(start)) {
      return 'UPCOMING'
    } else if (currentTime.isBefore(end)) {
      return 'LIVE'
    } else {
      return 'COMPLETED'
    }
  }

  const sessions = useMemo(() => {
    let filteredSessions = [...allSessions].map((session) => ({
      ...session,
      status: getSessionStatus(localizedMoment(session.start).toDate(), localizedMoment(session.end).toDate()),
    }))
    return filteredSessions.filter((session) => {
      if (filters.length === 0) {
        return true
      }
      return filters.every((filter) => {
        switch (filter.type) {
          case 'day':
            return startOfDay(session.start) - filter.value === 0
          case 'stage':
            return session.stage.id === filter.value
          case 'speaker':
            return session.speakers.some((speaker) => speaker.name === filter.value)
          case 'time':
            return session.start == filter.value
          case 'recording':
            return filter.value === 'yes' ? !!session.video : !session.video
          case 'track':
            return session.track === filter.value
          default:
            return false
        }
      })
    })
  }, [allSessions, filters])

  const addOrUpdateFilter = useCallback((filter: Filter) => {
    setFilters((prevFilters) => {
      const index = prevFilters.findIndex((f) => f.type === filter.type)
      if (index === -1) {
        return [...prevFilters, filter]
      } else {
        return prevFilters.map((f, i) => (i === index ? filter : f))
      }
    })
  }, [])

  const removeFilter = useCallback((filter: Filter) => {
    setFilters((prevFilters) => prevFilters.filter((f) => f.type !== filter.type))
  }, [])

  const currentSession = useMemo(() => {
    const currentTime = currentTimeInUTC()
    return sessions.find((session) => {
      const start = localizedMoment(session.start)
      const end = localizedMoment(session.end)
      return currentTime.isBetween(start, end)
    })
  }, [sessions])


  return {
    sessions,
    addOrUpdateFilter,
    removeFilter,
    filters,
    possibleFilters,
    currentSession,
  }
}
