import React from 'react';
import ReactDOM from 'react-dom';

const modalContainer = document.getElementById('modal-container');

function ConfirmRemoveModuleModal({ isActive, onConfirmRemoveModule, onClose }) {
  return ReactDOM.createPortal(
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content box is-paddingless">
        <nav className="panel">
          <p className="panel-heading">Remove module</p>
          <div className="card-content">Do you really want to remove this module?</div>
          <div className="buttons has-addons is-right is-marginless">
            <button className="button is-white" onClick={onClose}>
              Cancel
            </button>
            <button className="button is-white has-text-danger" onClick={onConfirmRemoveModule}>
              Remove
            </button>
          </div>
        </nav>
      </div>
    </div>,
    modalContainer,
  );
}

export default ConfirmRemoveModuleModal;
