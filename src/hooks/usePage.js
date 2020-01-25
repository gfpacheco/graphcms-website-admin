import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const pageQuery = gql`
  query page($id: ID!) {
    page(where: { id: $id }) {
      id
      title
      modulesIds
    }
  }
`;

function usePage(id, options) {
  return useQuery(pageQuery, {
    variables: { id },
    ...options,
  });
}

export default usePage;
