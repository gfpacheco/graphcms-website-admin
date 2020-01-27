import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import useSchema from './useSchema';

function useModules(ids, options) {
  const { schema } = useSchema();
  const modulesNames = Object.keys(schema).filter(
    key => key.endsWith('Module') && !key.startsWith('Aggregate'),
  );

  const modulesQuery = gql`
    query modules($ids: [ID!]) {
      ${modulesNames
        .map(
          moduleName => `
            ${moduleName[0].toLowerCase()}${moduleName.substr(1)}s(where: { id_in: $ids }) {
              ${schema[moduleName].responseFields}
            }
          `,
        )
        .join('')}
    }
  `;

  return useQuery(modulesQuery, {
    skip: !ids,
    variables: { ids },
    ...options,
  });
}

export default useModules;
