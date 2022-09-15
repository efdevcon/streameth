import { ReactNode } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import styles from './Modal.module.scss'

interface Props {
  isOpen: boolean
  children: ReactNode
  onClose: () => void
}

export default function Modal({ isOpen, children, onClose }: Props) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className={`${styles.modal__container} flex justify-center items-center`} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className={styles.modal__bg} />
        </Transition.Child>

        <div className={styles.modal}>
          <div className={styles.modal__inner}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className={styles.modal__box}>{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
