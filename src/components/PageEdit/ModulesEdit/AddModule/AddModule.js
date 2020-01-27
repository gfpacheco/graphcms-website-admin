import React from 'react';
import { ReactComponent as Plus } from './plus.svg';
import './AddModule.scss';

function AddModule({ onClick }) {
  return (
    <div className="add-module">
      <div>
        <hr className="is-marginless" />
        <button type="button" onClick={onClick}>
          <Plus />
        </button>
      </div>
    </div>
  );
}

export default AddModule;
