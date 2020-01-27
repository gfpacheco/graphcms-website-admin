import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const schemaQuery = gql`
  {
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
  }
`;

function prepareType(type) {
  const fields = type.fields.filter(field => field.type.name);

  return {
    ...type,
    fields,
    responseFields: [
      'id',
      ...fields.map(field =>
        field.type.name === 'Asset' ? `${field.name} { id, mimeType, url }` : field.name,
      ),
    ].join(' '),
  };
}

function useSchema() {
  const { loading, error, data } = useQuery(schemaQuery);
  const schema = { modules: [] };

  if (data) {
    data.__schema.types.forEach(type => {
      if (type.name === 'Page') {
        schema.Page = prepareType(type);
      } else if (type.name.endsWith('Module')) {
        schema[type.name] = prepareType(type);
      }
    });
  }

  return { loading, error, schema };
}

export default useSchema;
