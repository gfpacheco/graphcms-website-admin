import get from 'lodash.get';
import pick from 'lodash.pick';
import { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useSchema from './useSchema';
import useToast from './useToast';

const updatePageMutation = gql`
  mutation updatePage($id: ID!, $data: PageUpdateInput!) {
    updatePage(where: { id: $id }, data: $data) {
      id
      title
      modulesIds
    }
  }
`;

function useUpdatePage(id) {
  const [state, setState] = useState({ loading: false, error: undefined });
  const client = useApolloClient();
  const { schema } = useSchema();
  const { pushToast } = useToast();

  async function updatePage(form) {
    setState({ loading: true, error: undefined });

    try {
      await form.__dirtyFields.map(field => {
        if (field.startsWith('modules')) {
          const module = get(form, field);
          const fieldsNames = schema[module.__typename].fields.map(field => field.name);
          const data = pick(module, fieldsNames);

          const mutation = gql`
            mutation update${module.__typename}($id: ID!, $data: ${module.__typename}UpdateInput!) {
              update${module.__typename} (where: { id: $id }, data: $data) {
                id
                ${fieldsNames.join(' ')}
              }
            }
          `;

          return client.mutate({
            mutation,
            variables: { id: module.id, data },
          });
        }

        return undefined;
      });

      if (form.__dirtyFields.length > 1 || !form.__dirtyFields[0].startsWith('modules')) {
        await client.mutate({
          mutation: updatePageMutation,
          variables: {
            id,
            data: pick(
              form,
              schema.Page.fields.map(field => field.name),
            ),
          },
        });
      }

      setState({ loading: false, error: undefined });
      pushToast('success', 'Page updated!');
    } catch (error) {
      console.error(error);
      setState({ loading: false, error });
    }
  }

  return { ...state, updatePage };
}

export default useUpdatePage;
