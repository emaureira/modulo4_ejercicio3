import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

const withModal = (WrappedComponent) => {
  return (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = useCallback((content) => {
      setModalContent(content);
      setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
      setIsModalOpen(false);
      setModalContent(null);
    }, []);

    const ModalPortal = () => {
      if (!isModalOpen || !modalContent) return null;

       const modalRoot = document.getElementById('modal-root');
      if(!modalRoot) {
          console.error('Modal root not found in DOM. Make sure you have a div with id="modal-root"');
          return null;
      }
      return ReactDOM.createPortal(
          <div className="modal-overlay">
              <div className="modal-content">
                  {modalContent}
                  <button onClick={closeModal}>Cerrar</button>
              </div>
          </div>,
          modalRoot
      );
    };

    return (
      <>
        <WrappedComponent {...props} openModal={openModal} />
        <ModalPortal />
      </>
    );
  };
};

export default withModal;