import { useState } from 'react'
import { PageContainer } from 'components/Container'
import SpeakerModalBox from 'components/Speaker/ModalBox'
import Modal from '../Modal'
import { ShareBox } from '../Share/Box'
import { Speaker } from 'types'
import { ShareIcon } from '@heroicons/react/24/outline'
import Container from 'components/Container'
import { Session } from 'types'
import { Player } from 'components/Player/vod'
import SpeakerIconList from 'components/Speaker/IconList'

export default function SessionComponent({ session }: { session: Session }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContentType, setModalContentType] = useState<string | null>(null)
  const [speaker, setSpeaker] = useState<Speaker | undefined>(undefined)

  const openModal = (type: 'share' | 'speaker' | 'embed', speaker?: Speaker) => {
    setModalContentType(type)
    setSpeaker(speaker)
    setModalOpen(true)
  }

  const modalContent = () => {
    if (modalContentType === 'share') {
      return <ShareBox title={session.name} />
    } else if (modalContentType === 'speaker') {
      return <SpeakerModalBox speaker={speaker} />
    } else if (modalContentType === 'embed') {
      // return <Embed stageId={currentStage.id} />
    }
    return null
  }
  return (
    <div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalContent()}
      </Modal>
      <div className="overflow-y-scroll h-full">
        <div className="bg-black opacity-80 border border-transparent py-2 space-y-2">
          <Container>
            <div className="py-2 flex justify-between items-center dark:text-gray-400">
              <div className="flex flex-col">
                <p className="font-thin text-white">WATCHING:</p>
                <p className="font-medium text-white">{`${session?.name}`}</p>
              </div>
              <div className="flex flex-col lg:flex-row space-y-2">
                <span
                  className="p-1 cursor-pointer text-white border-white border-2  ml-auto text-sm lg:text-base"
                  onClick={() => openModal('embed')}>
                  embed
                </span>
                <ShareIcon className="h-8 w-8 cursor-pointer text-white ml-3 dark:text-gray-300" onClick={() => openModal('share')} />
              </div>
            </div>
          </Container>
        </div>
        <div className="flex flex-col lg:flex-row md:h-full">
          <div className="flex flex-col w-full lg:px-8 aspect-video py-4">
            <Player src={session.video} />
          </div>
           <div className="lg:w-1/3 lg:pl-5 lg:pr-8 lg:py-5 box-border flex flex-col overflow-auto lg:mt-0 h-full">
            {session.gpt_description ? session.gpt_description : session.description}
            <div className="mt-4">
            <SpeakerIconList speakers={session.speakers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
