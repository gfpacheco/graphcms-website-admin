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

function useSchema() {
  const { loading, error, data } = useQuery(schemaQuery);
  const schema = { modules: [] };

  if (data) {
    data.__schema.types.forEach(type => {
      if (type.name === 'Page') {
        schema.page = type;
      } else if (type.name.endsWith('Module')) {
        schema.modules.push(type);
      }
    });
  }

  return { loading, error, schema };
}

export default useSchema;
