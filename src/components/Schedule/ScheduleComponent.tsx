import React, { useEffect } from 'react'
import { useSessions } from 'hooks/useSessions'
import Container, { PageContainer, SessionContainer } from 'components/Container'
import SubNavigation from 'components/Navbar/SubNavigation'
import ScheduleStrip from './ScheduleStrip'
import { Session } from 'types'
import moment from 'moment'
const extractAllSessionTimes = (sessions: Session[]) => {
  const times = sessions.map((session) => session.start)
  const uniqueTimes = [...new Set(times)]
  const orderedTimes = uniqueTimes.sort((a, b) => {
    const aDate = new Date(a)
    const bDate = new Date(b)
    return aDate.getTime() - bDate.getTime()
  })
  return orderedTimes
}

export default function ScheduleComponent() {
  const { sessions, currentSession } = useSessions()
  const [isLoading, setIsLoading] = React.useState(true)
  const scrollIntoViewRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoading(false)
    if (scrollIntoViewRef.current) {
      scrollIntoViewRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])
  return (
    <>
      <SubNavigation>
        <div className="py-2 flex justify-between items-center dark:text-gray-400">
          <div className="flex flex-col">
            <p className="font-thin text-white">Welcome to {process.env.NEXT_PUBLIC_NAME} live!</p>
            <p className="font-medium text-white">Schedule</p>
          </div>
        </div>
      </SubNavigation>
      <PageContainer>
        <div className="flex flex-col h-full relative">
          {sessions.length === 0 && !isLoading && (
            <div className="px-8 m-auto flex h-full w-full">
              <p className="m-auto">No sessions have been uploaded yet</p>
            </div>
          )}
          {extractAllSessionTimes(sessions).map((time) => (
            <div className="my-2" key={time} ref={currentSession?.start === time ? scrollIntoViewRef : null}>
              <p className="text-lg text-center p-4">{moment(time).format('MMMM Do, h:mm a')}</p>
              <ScheduleStrip key={time} time={time} />
            </div>
          ))}
        </div>
      </PageContainer>
    </>
  )
}
