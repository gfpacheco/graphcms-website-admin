import React from 'react';
import fieldComponents from '../';
import './FieldModule.scss';

function FieldModule({ module, type, onChange }) {
  function onFieldChange(field, value) {
    onChange({
      ...module,
      [field]: value,
    });
  }

  return (
    <div className="field-module field">
      <h2 className="title is-4">{module.__typename}</h2>
      {type.fields.map(field => {
        const Field = fieldComponents[field.type.name];

        return (
          <Field
            key={field.name}
            field={field}
            value={module[field.name]}
            onChange={value => onFieldChange(field.name, value)}
          />
        );
      })}
    </div>
  );
}

export default FieldModule;
