import React from 'react';

function FieldString({ field, value }) {
  return (
    <div className="field">
      <label className="label">{field.name}</label>
      <div className="control">
        <input className="input" type="text" value={value} />
      </div>
    </div>
  );
}

export default FieldString;
