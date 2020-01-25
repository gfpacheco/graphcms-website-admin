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

function filterFields(type) {
  return {
    ...type,
    fields: type.fields.filter(field => field.type.name),
  };
}

function useSchema() {
  const { loading, error, data } = useQuery(schemaQuery);
  const schema = { modules: [] };

  if (data) {
    data.__schema.types.forEach(type => {
      if (type.name === 'Page') {
        schema.Page = filterFields(type);
      } else if (type.name.endsWith('Module')) {
        schema[type.name] = filterFields(type);
      }
    });
  }

  return { loading, error, schema };
}

export default useSchema;
