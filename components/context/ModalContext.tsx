"use client";
import { useState, createContext } from "react";
import Modal from "@/components/Layout/Modal";

const ModalContext = createContext<{
  modal: React.ReactNode | null;
  openModal: (modal: React.ReactNode) => void;
  closeModal: () => void;
}>({
  modal: null,
  openModal: () => {},
  closeModal: () => {},
});

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<React.ReactNode | null>(null);

  const openModal = (modal: React.ReactNode) => {
    console.log(modal)
    setModal(modal);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      <Modal open={modal !== null} onClose={closeModal}>
        {modal}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};


export { ModalContext, ModalContextProvider };