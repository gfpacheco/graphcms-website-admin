import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';
import FieldString from './FieldString';
import './PageEdit.scss';

const fieldComponents = {
  String: FieldString,
};

const schemaQuery = gql`
  query page($id: ID!) {
    __schema {
      types {
        name
        fields {
          name
          type {
            name
          }
        }
      }
    }

    page(where: { id: $id }) {
      id
      title
    }
  }
`;

function PageEdit({ pageId }) {
  const { loading, error, data } = useQuery(schemaQuery, { variables: { id: pageId } });

  const pageSchema = data && data.__schema.types.find(type => type.name === 'Page');
  const fields = pageSchema && pageSchema.fields.filter(field => field.type.name);
  const page = data && data.page;

  return (
    <div className="page-edit container">
      <h1 className="title">Edit page {loading && <LoadingIndicator />}</h1>
      <ErrorIndicator error={error} />
      {fields &&
        fields.map(field => {
          const Field = fieldComponents[field.type.name];

          return <Field key={field.name} field={field} value={page[field.name]} />;
        })}
    </div>
  );
}

export default PageEdit;
