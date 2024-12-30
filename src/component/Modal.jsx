import React from 'react';
import ReactDOM from 'react-dom';


const Modal = ({ isOpen, content, onClose }) => {
    if (!isOpen) return null;

    const modalRoot = document.getElementById('modal-root');
    if(!modalRoot) {
        console.error('Modal root not found in DOM. Make sure you have a div with id="modal-root"');
        return null;
    }


    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                {content}
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;