import React from 'react';
import './Toasts.scss';

function Toasts({ toasts }) {
  return (
    <div className="toasts">
      {toasts.map(toast => (
        <div key={toast.id} className={`notification is-${toast.color}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}

export default Toasts;
