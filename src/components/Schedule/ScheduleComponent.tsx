import React, { useEffect, useState } from 'react'
import { useSessions } from 'hooks/useSessions'
import { PageContainer } from 'components/Container'
import { Session } from 'types'
import Tab from 'components/Stage/Tab'
import ScheduleStrip from './ScheduleStrip'
import { localizedMoment } from 'utils/dateTime'

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

const extractAllSessionDates = (sessions: Session[]) => {
  const times = sessions.map((session) => {
    const date = new Date(session.start)
    return date.toISOString().split('T')[0]
  })
  return [...new Set(times)]
}

export default function ScheduleComponent() {
  const { sessions, currentSession } = useSessions()
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollIntoViewRef = React.useRef<HTMLDivElement>(null)
  const tabsRef = [React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null)]

  const allDates = extractAllSessionDates(sessions)

  useEffect(() => {
    setIsLoading(false)
    if (scrollIntoViewRef.current) {
      scrollIntoViewRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (tabsRef[currentIndex].current) {
      // @ts-ignore
      tabsRef[currentIndex].current.scrollIntoView({ behavior: 'smooth' }) 
    }
  }, [currentIndex])

  return (
    <>
      <div className="flex flex-col justify-end items-center dark:text-gray-400 ">
        <div className="flex flex-col relative w-full ">
          {/* <Image src="/cover-image.jpg" alt="Logo" layout="fill" /> */}
          <div className="flex flew-row justify-center items-center  w-full ">
            {allDates.map((date, index) => (
              <Tab index={index} key={date} currentIndex={currentIndex} setIndex={setCurrentIndex}>
                {date}
              </Tab>
            ))}
          </div>
        </div>
      </div>
      <PageContainer>
        <div className="flex flex-col h-full relative">
          <div className="flex flex-row justify-center items-center"></div>
          {sessions.length === 0 && !isLoading && (
            <div className="px-8 m-auto flex h-full w-full">
              <p className="m-auto">No sessions have been uploaded yet</p>
            </div>
          )}

          {allDates.map((date, index) => {
            return (
              <div key={date} ref={tabsRef[index]} >
                {extractAllSessionTimes(
                  sessions.filter((session) => {
                    const sessionDate = new Date(session.start)
                    const sessionDateString = sessionDate.toISOString().split('T')[0]

                    return sessionDateString === date
                  })
                ).map((time) => (
                  <div className="my-2 flex flex-col md:flex-row" key={time} ref={currentSession?.start === time ? scrollIntoViewRef : null}>
                    <p className="text-lg text-center p-2 bg-black text-white w-full md:max-w-[6rem] opacity-80">
                      {localizedMoment(time).format('h:mm a')}
                    </p>
                    <ScheduleStrip key={time} time={time} />
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </PageContainer>
    </>
  )
}
