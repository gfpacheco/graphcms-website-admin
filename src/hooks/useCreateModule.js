import { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useSchema from './useSchema';

function useCreateModule() {
  const [state, setState] = useState({ loading: false, error: undefined });
  const client = useApolloClient();
  const { schema } = useSchema();

  async function createModule(moduleName) {
    setState({ loading: true, error: undefined });

    try {
      const mutationName = `create${moduleName}`;
      const { responseFields } = schema[moduleName];

      const mutation = gql`
        mutation ${mutationName} {
          ${mutationName}(data: { status: PUBLISHED }) {
            id
            ${responseFields}
          }
        }
      `;

      const {
        data: { [mutationName]: module },
      } = await client.mutate({
        mutation,
      });

      setState({ loading: false, error: undefined });

      return module;
    } catch (error) {
      console.error(error);
      setState({ loading: false, error });
    }
  }

  return [createModule, state];
}

export default useCreateModule;
