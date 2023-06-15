// import { useEffect, useState } from "react";
// import { useStage } from 'hooks/useStage'
// import { useSessions } from 'hooks/useSessions'
// import { Player } from 'components/Player'
// import { StageContainer } from 'components/Container'
// import SpeakerModalBox from 'components/Speaker/ModalBox'
// import SessionList from 'components/Session/List'
// import Modal from '../Modal'
// import { ShareBox } from '../Share/Box'
// import { Speaker } from 'types'
// import Embed from 'components/Embed'
// import SessionInfoBox from 'components/Session/Infobox'
// import Tab from './Tab'
// // import ChatBar from 'components/Chat'
// import SubNavigation from 'components/Navbar/SubNavigation'

import Stage from "@/services/model/stage";
import SessionController from "@/services/controller/session";

import SessionList from "@/components/sessions/SessionList";
import Player from "./Player";
import StageTabs from "./StageTabs";
export default async function StageLayout({ stage }: { stage: Stage }) {
  const sessionController = new SessionController();
  const currentSession = await sessionController.getCurrentSessionForStage(
    stage.id,
    stage.eventId
  );
  const sessions = await sessionController.getSessionsForStage(
    stage.id,
    stage.eventId
  );


  return (
    <div>
      {/* <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalContent()}
      </Modal> */}
      <div>
        <div className="py-2 flex justify-between items-center dark:text-gray-400">
          <div className="flex flex-col">
            <p className="font-thin text-white">WATCHING:</p>
            <p className="font-medium text-white">{`${currentSession?.name}`}</p>
          </div>
          {/* <div className="hidden md:flex flex-col">
            <p className="font-thin text-white">NEXT:</p>
            <p className="font-medium text-white">{`${sessions[1]?.name}`}</p>
          </div> */}
        </div>
      </div>
      <div>
        <div className="flex flex-col lg:flex-row h-full relative overflow-scroll">
          <div className="flex flex-col w-full lg:px-8 lg:py-2 lg:flex-row">
            <Player
              streamId={stage.streamSettings.streamId}
              playerName={stage.name}
            />
            <div className="hidden md:block">
              {/* <SessionInfoBox
                session={activeSession}
                onShareClick={() => openModal('share')}
                onSpeakerClick={(speaker) => openModal('speaker', speaker)}
                onEmbedClick={() => openModal('embed')}
              />
            </div> */}
            </div>
            <div className="h-1/2 lg:w-1/3 p-3 flex-grow  lg:pl-0 lg:pb-2 lg:pt-2 lg:pr-4 box-border flex flex-col overflow-auto lg:mt-0 lg:h-full">
              <StageTabs
                tabs={[
                  {
                    id: "chat",
                    header: "Chat",
                    content: <div>Chat</div>,
                  },
                  {
                    id: "sessions",
                    header: "Sessions",
                    content: (
                      <SessionList
                        sessions={sessions}
                        currentSession={currentSession}
                        isLive={false}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
