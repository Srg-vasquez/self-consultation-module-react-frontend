import React from 'react';
import './css/Modal.css';

function Modal({ show, title, message, onConfirm, onCancel }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn btn-success">Sí</button>
          <button onClick={onCancel} className="btn btn-danger">No</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
