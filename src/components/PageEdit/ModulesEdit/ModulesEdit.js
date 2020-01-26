import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import FieldModule from '../../fields/FieldModule';
import useSchema from '../../../hooks/useSchema';

function ModulesEdit({ modules, onFieldChange }) {
  const { schema } = useSchema();

  return (
    <div>
      {modules.map((module, index) => (
        <FieldModule
          key={module.id}
          index={index}
          module={module}
          type={schema[module.__typename]}
          onChange={value => onFieldChange(`modules[${index}]`, value)}
        />
      ))}
    </div>
  );
}

export default SortableContainer(ModulesEdit);
