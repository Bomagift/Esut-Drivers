
import React from 'react';
import "../Styles/Modal.css"; // Import a CSS file for modal styling

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Do not render anything if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
