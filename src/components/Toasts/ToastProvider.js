import React, { useState, useRef } from 'react';
import uniqueId from 'lodash.uniqueid';
import ToastContext from './ToastContext';
import Toasts from './Toasts';

function ToastProvider({ children }) {
  const stateRef = useRef();
  const [toasts, setToasts] = useState([]);
  stateRef.current = { toasts, setToasts };

  function pushToast(color, message) {
    stateRef.current.setToasts([...stateRef.current.toasts, { id: uniqueId(), color, message }]);

    setTimeout(() => {
      const [, ...remainingToasts] = stateRef.current.toasts;
      stateRef.current.setToasts(remainingToasts);
    }, 2500);
  }

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <Toasts toasts={stateRef.current.toasts} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
