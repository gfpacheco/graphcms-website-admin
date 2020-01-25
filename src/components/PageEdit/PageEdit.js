import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';
import useSchema from '../../hooks/useSchema';
import useForm from '../../hooks/useForm';
import fieldComponents from '../fields';
import FieldModule from '../fields/FieldModule';

const pageQuery = gql`
  query page($id: ID!) {
    page(where: { id: $id }) {
      id
      title
      modulesIds
    }
  }
`;

const modulesQuery = gql`
  query modules($ids: [ID!]) {
    fooModules(where: { id_in: $ids }) {
      id
      text
    }

    barModules(where: { id_in: $ids }) {
      id
      text
    }
  }
`;

function PageEdit({ pageId }) {
  const { schema } = useSchema();
  const [form, setInitialData, onFieldChange] = useForm();

  const { loading: loadingPage, error: pageError } = useQuery(pageQuery, {
    variables: { id: pageId },
    onCompleted: data => setInitialData(data.page),
  });

  const { loading: loadingModules, error: modulesError } = useQuery(modulesQuery, {
    skip: loadingPage || pageError,
    variables: { ids: form && form.modulesIds },
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

  const fields = schema.page.fields.filter(field => field.type.name);

  return (
    <div className="container">
      <h1 className="title">Edit page {loadingPage && <LoadingIndicator />}</h1>
      <ErrorIndicator error={pageError || modulesError} />
      {form && (
        <>
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
        </>
      )}
    </div>
  );
}

export default PageEdit;
