import React from 'react'
import { PageContainer } from 'components/Container'
import SpeakerBox from './SpeakerBox'
import { Session } from 'types'
import { DateDetail, StageDetail } from 'components/Session/SessionDetails'
import { Player } from '@livepeer/react'
interface Props {
  session: Session
}

export default function SessionComponent(props: Props) {
  return (
    <PageContainer>
      <div className="flex flex-col lg:flex-row h-full">
        <div className="flex flex-col bg-black w-full h-full">
          <div className="m-auto">
            <Player
              src={props.session.video?.src}
              autoPlay
              objectFit='cover'
              aspectRatio='16to9'
              theme={{
                borderStyles: {
                  containerBorderStyle: 'hidden',
                },
                colors: {
                  accent: '#00a55f',
                },
                shadows: {
                  containerShadow: 'none',
                  containerShadowHover: 'none',
                },
                space: {
                  controlsBottomMarginX: '10px',
                  controlsBottomMarginY: '5px',
                  controlsTopMarginX: '15px',
                  controlsTopMarginY: '10px',
                },
                radii: {
                  containerBorderRadius: '0px',
                },
              }}
            />
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-2/5 px-5">
          <div className=" my-5 lg:mb-2">
            <h2 className="font-bold text-xl lg:text-3xl dark:text-white mb-3">{props.session.name}</h2>
            <div className="flex flex-row space-x-4 my-2">
              <DateDetail start={props.session.start} end={props.session.end} />
              <StageDetail stage={props.session.stage.name} />
            </div>
          </div>

          <div className="dark:text-gray-300">
            <p>{props.session.description}</p>
          </div>
          <div className="flex items-center justify-between my-5 lg:mb-2">
            <h2 className="font-bold text-lg lg:text-3xl dark:text-gray-300">Speakers:</h2>
          </div>
          {props.session.speakers.map((speaker) => (
              <SpeakerBox key={speaker.id} speaker={speaker} />
            ))}
        </div>
      </div>
    </PageContainer>
  )
}
