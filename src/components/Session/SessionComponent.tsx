import React from 'react'
import { PageContainer } from 'components/Container'
import SpeakerBox from './SpeakerBox'
import { Session } from 'types'
import { DateDetail, StageDetail } from 'components/Session/SessionDetails'
import { Player } from 'components/Player/vod'
interface Props {
  session: Session
}

export default function SessionComponent(props: Props) {
  const { session } = props
  const { speakers, stage, name, description, video, start, end } = session

  return (
    <PageContainer>
      <div className="flex flex-col lg:flex-row h-full">
        <div className="flex flex-col bg-black w-full h-full">
          <div className="m-auto">
            <Player src={video?.src} />
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-2/6 px-5">
          <div className=" my-5 lg:mb-2">
            <h2 className="font-bold text-xl lg:text-3xl dark:text-white mb-3">{name}</h2>
            <div className="flex flex-row space-x-4 my-2">
              <DateDetail start={start} end={end} />
              <StageDetail stage={stage.name} />
            </div>
          </div>
          <div className="dark:text-gray-300">
            <p>{description}</p>
          </div>
          <div className="flex items-center justify-between my-5 lg:mb-2">
            <h2 className="text-lg lg:text-2xl dark:text-gray-300">Speakers</h2>
          </div>
          {speakers.map((speaker) => (
            <SpeakerBox key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
