import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import flatten from 'lodash.flatten';
import arrayMove from 'array-move';
import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';
import ModulesEdit from './ModulesEdit';
import SelectModuleModal from './SelectModuleModal';
import ConfirmRemoveModuleModal from './ConfirmRemoveModuleModal';
import useSchema from '../../hooks/useSchema';
import useForm from '../../hooks/useForm';
import usePage from '../../hooks/usePage';
import useModules from '../../hooks/useModules';
import useUpdatePage from '../../hooks/useUpdatePage';
import useCreateModule from '../../hooks/useCreateModule';
import fieldComponents from '../fields';
import './PageEdit.scss';

function PageEdit() {
  const [indexToAddModule, setIndexToAddModule] = useState();
  const [indexToRemoveModule, setIndexToRemoveModule] = useState();
  const { pageId } = useParams();
  const { schema } = useSchema();
  const [form, setInitialData, onFieldChange] = useForm();

  const { loading: loadingPage, error: pageError } = usePage(pageId, {
    onCompleted: data => setInitialData(data.page),
  });

  const { loading: loadingModules, error: modulesError } = useModules(form && form.modulesIds, {
    onCompleted: data =>
      setInitialData({
        ...form,
        modules: form.modulesIds.map(id =>
          flatten(Object.values(data)).find(module => module.id === id),
        ),
      }),
  });

  const [
    createModule,
    { loading: loadingCreateModule, error: createModuleError },
  ] = useCreateModule();

  const { loading: loadingSave, error: saveError, updatePage } = useUpdatePage(pageId);

  function handleModuleSort({ oldIndex, newIndex }) {
    const newModules = [...form.modules];
    onFieldChange('modules', arrayMove(newModules, oldIndex, newIndex));
  }

  function handleAddModule(index) {
    setIndexToAddModule(index);
  }

  async function handleModuleSelected(moduleName) {
    const module = await createModule(moduleName);

    if (module) {
      const newModules = [...form.modules];
      newModules.splice(indexToAddModule, 0, module);
      onFieldChange('modules', newModules);
      setIndexToAddModule();
    }
  }

  function cancelAddModule() {
    setIndexToAddModule();
  }

  function handleRemoveModule(index) {
    setIndexToRemoveModule(index);
  }

  function handleConfirmRemoveModule() {
    const newModules = [...form.modules];
    newModules.splice(indexToRemoveModule, 1);
    onFieldChange('modules', newModules);
    setIndexToRemoveModule();
  }

  function cancelRemoveModule() {
    setIndexToRemoveModule();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updatePage(form);
    setInitialData(form);
  }

  const fields = schema.Page.fields.filter(field => field.type.name);

  return (
    <form className="page-edit" onSubmit={handleSubmit}>
      <div className="page-edit-header container">
        <div className="level">
          <div className="level-left">
            <h1 className="title">
              Edit page {(loadingPage || loadingModules) && <LoadingIndicator />}
            </h1>
          </div>
          <button
            className={`level-right button is-link ${loadingSave ? 'is-loading' : ''}`}
            disabled={!form || form.__dirtyFields.length === 0}
          >
            Save
          </button>
        </div>
        <ErrorIndicator error={pageError || modulesError || saveError || createModuleError} />
        {form &&
          fields.map(field => {
            const Field = fieldComponents[field.type.name] || null;

            return (
              Field && (
                <Field
                  key={field.name}
                  field={field}
                  value={form[field.name]}
                  onChange={value => onFieldChange(field.name, value)}
                />
              )
            );
          })}
      </div>
      {form && (
        <>
          {form.modules && (
            <ModulesEdit
              modules={form.modules}
              onFieldChange={onFieldChange}
              pressDelay={200}
              onSortEnd={handleModuleSort}
              onAddModule={handleAddModule}
              onRemoveModule={handleRemoveModule}
            />
          )}
          <div className="buttons container level">
            <div />
            <button
              className={`button is-link ${loadingSave ? 'is-loading' : ''}`}
              disabled={form.__dirtyFields.length === 0}
            >
              Save
            </button>
          </div>
        </>
      )}
      <SelectModuleModal
        isActive={typeof indexToAddModule === 'number'}
        onModuleSelected={handleModuleSelected}
        loading={loadingCreateModule}
        onClose={cancelAddModule}
      />
      <ConfirmRemoveModuleModal
        isActive={typeof indexToRemoveModule === 'number'}
        onConfirmRemoveModule={handleConfirmRemoveModule}
        onClose={cancelRemoveModule}
      />
    </form>
  );
}

export default PageEdit;
