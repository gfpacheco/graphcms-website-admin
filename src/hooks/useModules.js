import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

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

function useModules(ids, options) {
  return useQuery(modulesQuery, {
    skip: !ids,
    variables: { ids },
    ...options,
  });
}

export default useModules;
