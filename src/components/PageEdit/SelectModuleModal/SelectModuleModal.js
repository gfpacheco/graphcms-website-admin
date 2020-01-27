import React from 'react';
import ReactDOM from 'react-dom';
import useSchema from '../../../hooks/useSchema';
import LoadingIndicator from '../../LoadingIndicator';

const modalContainer = document.getElementById('modal-container');

function SelectModuleModal({ isActive, onModuleSelected, loading, onClose }) {
  const { schema } = useSchema();
  const modulesNames = Object.keys(schema).filter(
    key => key.endsWith('Module') && !key.startsWith('Aggregate'),
  );

  return ReactDOM.createPortal(
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content box is-paddingless">
        <nav className="panel">
          <div className="panel-heading level is-mobile is-marginless">
            <div className="level-left">
              <span className="level-item">Select a module to add</span>
              <span className="level-item">{loading && <LoadingIndicator />}</span>
            </div>
            <button type="button" className="delete" onClick={onClose} />
          </div>
          {modulesNames.map(moduleName => (
            <button
              key={moduleName}
              type="button"
              className="button is-large is-white is-fullwidth panel-block"
              onClick={() => onModuleSelected(moduleName)}
              disabled={loading}
            >
              {moduleName}
            </button>
          ))}
        </nav>
      </div>
    </div>,
    modalContainer,
  );
}

export default SelectModuleModal;
