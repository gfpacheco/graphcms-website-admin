import React from 'react';

function FieldString({ field, value, onChange }) {
  return (
    <div className="field">
      <label className="label is-capitalized">{field.name}</label>
      <div className="control">
        {field.name === 'description' ? (
          <textarea
            className="textarea"
            value={value}
            onChange={event => onChange(event.target.value)}
          />
        ) : (
          <input
            className="input"
            type="text"
            value={value}
            onChange={event => onChange(event.target.value)}
          />
        )}
      </div>
    </div>
  );
}

export default FieldString;
