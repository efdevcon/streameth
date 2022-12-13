import React from 'react'
import { Speaker } from 'types'
import SpeakerIcon from 'components/Speaker/Icon'
import SpeakerModalBox from 'components/Speaker/ModalBox'
import Modal from 'components/Modal'

interface Props {
  speaker: Speaker
}

export default function SpeakerBox(props: Props) {
  const { speaker } = props
  const { name, avatarUrl } = speaker
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <SpeakerModalBox speaker={speaker} />
        </Modal>
      )}
      <div
        className="flex flex-row items-center rounded bg-gray-200 p-4 box-border cursor-pointer mb-3 dark:bg-black dark:shadow-white dark:shadow"
        onClick={() => setIsOpen(true)}>
        <SpeakerIcon speaker={speaker} />
        <div>
          <h3 className="font-normal text-lg ml-4 dark:text-gray-200">{name}</h3>
        </div>
      </div>
    </>
  )
}
