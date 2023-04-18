import { useEffect, useState } from 'react'
import { useStage } from 'hooks/useStage'
import { useSessions } from 'hooks/useSessions'
import { Player } from 'components/Player'
import { PageContainer } from 'components/Container'
import SpeakerModalBox from 'components/Speaker/ModalBox'
import SessionList from 'components/Session/List'
import Modal from '../Modal'
import { ShareBox } from '../Share/Box'
import { Speaker } from 'types'
import Embed from 'components/Embed'
import Container from 'components/Container'
import SessionInfoBox from 'components/Session/Infobox'
import moment from 'moment'
export function StageComponent() {
  const currentStage = useStage()
  const { sessions, addOrUpdateFilter } = useSessions()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContentType, setModalContentType] = useState<string | null>(null)
  const [speaker, setSpeaker] = useState<Speaker | undefined>(undefined)
  console.log(moment().startOf('day').valueOf())
  useEffect(() => {
    addOrUpdateFilter({ type: 'stage', value: currentStage.id })
    // current date in unix timestamp
    addOrUpdateFilter({ type: 'day', value: moment().startOf('day').valueOf() })
  }, [currentStage])

  const currentSession = sessions[0]

  const openModal = (type: 'share' | 'speaker' | 'embed', speaker?: Speaker) => {
    setModalContentType(type)
    setSpeaker(speaker)
    setModalOpen(true)
  }

  const modalContent = () => {
    if (modalContentType === 'share') {
      return <ShareBox title={currentSession.name} />
    } else if (modalContentType === 'speaker') {
      return <SpeakerModalBox speaker={speaker} />
    } else if (modalContentType === 'embed') {
      return <Embed stageId={currentStage.id} />
    }
    return null
  }

  return (
    <div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalContent()}
      </Modal>
      <PageContainer>
        <div className="bg-black opacity-80 border border-transparent py-2 space-y-2">
          <Container>
            <div className="py-2 flex justify-between items-center dark:text-gray-400">
              <div className="flex flex-col">
                <p className="font-thin text-white">WATCHING:</p>
                <p className="font-medium text-white">{`${currentSession?.name}`}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-thin text-white">NEXT:</p>
                <p className="font-medium text-white">{`${sessions[1]?.name}`}</p>
              </div>
            </div>
          </Container>
        </div>
        <div className="flex flex-col lg:flex-row md:h-full h-full overflow-auto">
          <div className="flex flex-col w-full lg:px-8 lg:py-4 overflow-y-scroll box-border">
            <Player stream={currentStage.stream} />
            <SessionInfoBox
              session={currentSession}
              onShareClick={() => openModal('share')}
              onSpeakerClick={(speaker) => openModal('speaker', speaker)}
              onEmbedClick={() => openModal('embed')}
            />
          </div>
          <div className="h-1/2 lg:w-1/3 p-3 lg:pb-0 lg:pl-0 lg:pt-4 lg:pr-4 box-border flex flex-col overflow-auto lg:mt-0 lg:h-full">
            {/* <h3 className="text-2xl font-bold dark:text-white flex mb-3">Schedule</h3> */}
            <div className="flex flex-col w-full overflow-y-auto h-full">
              <SessionList sessions={sessions} currentSession={currentSession} isLive={false} />
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
