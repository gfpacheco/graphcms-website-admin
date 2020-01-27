import React from 'react';
import { ReactComponent as Trash } from './trash.svg';
import './TrashCan.scss';

function TrashCan({ onClick }) {
  return (
    <button type="button" className="trash-can" onClick={onClick}>
      <Trash />
    </button>
  );
}

export default TrashCan;
