import { useState, useEffect, useMemo, useCallback } from 'react';
import { Session, Filter, PossibleFilter, SessionStatus } from 'types';
import { startOfDay, currentTimeInUTC, localizedMoment } from 'utils/dateTime';
import { useContext } from 'react';
import { PageContext } from 'context/page-context';

export function useSessions(initFilters: Filter[] = []) {
  const context = useContext(PageContext);

  if (context === undefined) {
    throw new Error('useSession must be used within an EventContextProvider');
  }

  if (!context.sessions) {
    throw new Error('No sessions found');
  }

  const allSessions = context.sessions;
  const [filters, setFilters] = useState<Filter[]>(initFilters);
  const eventDays = [...new Set(allSessions.map((i) => startOfDay(i.start)))].sort();
  const stages = [...new Set(allSessions.map((i) => i.stage.id))].sort();
  const speakers = [...new Set(allSessions.map((i) => i.speakers.map((j) => j.name)).flat())].sort();

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
    ];
  }, [eventDays, stages, speakers]);

  const getSessionStatus = (start: Date, end: Date): SessionStatus => {
    const currentTime = currentTimeInUTC();

    if (currentTime.isBefore(start)) {
      return 'UPCOMING';
    } else if (currentTime.isBefore(end)) {
      return 'LIVE';
    } else {
      return 'COMPLETED';
    }
  };

  const sessions = useMemo(() => {
    let filteredSessions = [...allSessions].map((session) => ({
      ...session,
      status: getSessionStatus(session.start, session.end),
    }));
    return filteredSessions.filter((session) => {
      if (filters.length === 0) {
        return true;
      }
      return filters.every((filter) => {
        switch (filter.type) {
          case 'day':
            return startOfDay(session.start) === filter.value;
          case 'stage':
            return session.stage.id === filter.value;
          case 'speaker':
            return session.speakers.some((speaker) => speaker.name === filter.value);
          case 'time':
            return session.start >= filter.value;
          case 'recording':
            return filter.value === 'yes' ? !!session.video : !session.video;
          default:
            return false;
        }
      });
    });
  }, [allSessions, filters]);

  const addOrUpdateFilter = useCallback((filter: Filter) => {
    const index = filters.findIndex((f) => f.type === filter.type);
    if (index === -1) {
      setFilters([...filters, filter]);
    } else {
      const newFilters = [...filters];
      newFilters.splice(index, 1, filter);
      setFilters(newFilters);
    }
  }, [filters]);

  const removeFilter = useCallback((filterType: string) => {
    setFilters(filters.filter((f) => f.type !== filterType));
  }, [filters]);

  console.log(sessions, stages, filters)

  return {
    sessions,
    addOrUpdateFilter,
    removeFilter,
    filters,
    possibleFilters,
  };
}
