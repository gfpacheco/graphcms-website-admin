import React from 'react';

function ErrorIndicator({ error }) {
  return (
    (error || null) && (
      <p className="has-text-danger">
        <code>{JSON.stringify(error, null, 2)}</code>
      </p>
    )
  );
}

export default ErrorIndicator;
