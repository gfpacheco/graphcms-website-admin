import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import fieldComponents from '../';
import DragHandle from '../../DragHandle';
import './FieldModule.scss';

function FieldModule({ module, type, onChange }) {
  function onFieldChange(field, value) {
    onChange({
      ...module,
      [field]: value,
    });
  }

  return (
    <div className="field-module">
      <div className="container">
        <div className="level">
          <h2 className="title is-4">{module.__typename}</h2>
          <DragHandle />
        </div>
        {type.fields.map(field => {
          const Field = fieldComponents[field.type.name] || null;

          return (
            Field && (
              <Field
                key={field.name}
                field={field}
                value={module[field.name]}
                onChange={value => onFieldChange(field.name, value)}
              />
            )
          );
        })}
      </div>
    </div>
  );
}

export default SortableElement(FieldModule);
