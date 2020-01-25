import React from 'react';
import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';
import useSchema from '../../hooks/useSchema';
import useForm from '../../hooks/useForm';
import usePage from '../../hooks/usePage';
import useModules from '../../hooks/useModules';
import fieldComponents from '../fields';
import FieldModule from '../fields/FieldModule';
import useUpdatePage from '../../hooks/useUpdatePage';

function PageEdit({ pageId }) {
  const { schema } = useSchema();
  const [form, setInitialData, onFieldChange] = useForm();

  const { loading: loadingPage, error: pageError } = usePage(pageId, {
    onCompleted: data => setInitialData(data.page),
  });

  const { loading: loadingModules, error: modulesError } = useModules(form && form.modulesIds, {
    onCompleted: data =>
      setInitialData({
        ...form,
        modules: form.modulesIds.map(
          id =>
            data.fooModules.find(module => module.id === id) ||
            data.barModules.find(module => module.id === id),
        ),
      }),
  });

  const { loading: loadingSave, error: saveError, updatePage } = useUpdatePage(pageId);

  async function handleSubmit(event) {
    event.preventDefault();
    updatePage(form);
  }

  const fields = schema.Page.fields.filter(field => field.type.name);

  return (
    <div className="container">
      <h1 className="title">Edit page {loadingPage && <LoadingIndicator />}</h1>
      <ErrorIndicator error={pageError || modulesError || saveError} />
      {form && (
        <form onSubmit={handleSubmit}>
          {fields.map(field => {
            const Field = fieldComponents[field.type.name];

            return (
              <Field
                key={field.name}
                field={field}
                value={form[field.name]}
                onChange={value => onFieldChange(field.name, value)}
              />
            );
          })}
          {loadingModules && <LoadingIndicator />}
          {form.modules &&
            form.modules.map((module, index) => (
              <FieldModule
                key={module.id}
                module={module}
                type={schema[module.__typename]}
                onChange={value => onFieldChange(`modules[${index}]`, value)}
              />
            ))}
          <div className="field">
            <div className="control">
              <button
                className={`button is-link ${loadingSave ? 'is-loading' : ''}`}
                disabled={form.__dirtyFields.length === 0}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default PageEdit;
