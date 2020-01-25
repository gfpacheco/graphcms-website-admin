import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';
import FieldString from './FieldString';
import useSchema from '../../hooks/useSchema';
import useForm from '../../hooks/useForm';

const fieldComponents = {
  String: FieldString,
};

const pageQuery = gql`
  query page($id: ID!) {
    page(where: { id: $id }) {
      id
      title
    }
  }
`;

function PageEdit({ pageId }) {
  const { schema } = useSchema();
  const [form, setInitialData, onFieldChange] = useForm();
  const { loading, error } = useQuery(pageQuery, {
    variables: { id: pageId },
    onCompleted: data => setInitialData(data.page),
  });

  const fields = schema.page.fields.filter(field => field.type.name);

  return (
    <div className="container">
      <h1 className="title">Edit page {loading && <LoadingIndicator />}</h1>
      <ErrorIndicator error={error} />
      {form &&
        fields.map(field => {
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
    </div>
  );
}

export default PageEdit;
