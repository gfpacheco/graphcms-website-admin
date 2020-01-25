import React from 'react';
import './ErrorIndicator.scss';

function ErrorIndicator({ error }) {
  return (
    (error || null) && (
      <pre className="error-indicator has-text-danger">
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    )
  );
}

export default ErrorIndicator;
