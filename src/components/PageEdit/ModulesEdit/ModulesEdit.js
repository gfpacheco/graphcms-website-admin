import React, { Fragment } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import FieldModule from '../../fields/FieldModule';
import AddModule from './AddModule';
import useSchema from '../../../hooks/useSchema';

function ModulesEdit({ modules, onFieldChange, onAddModule, onRemoveModule }) {
  const { schema } = useSchema();

  return (
    <div>
      {modules.map((module, index) => (
        <Fragment key={module.id}>
          <AddModule onClick={() => onAddModule(index)} />
          <FieldModule
            index={index}
            module={module}
            type={schema[module.__typename]}
            onChange={value => onFieldChange(`modules[${index}]`, value)}
            onRemove={() => onRemoveModule(index)}
          />
        </Fragment>
      ))}
      <AddModule onClick={() => onAddModule(modules.length)} />
    </div>
  );
}

export default SortableContainer(ModulesEdit);
