import get from 'lodash.get';
import pick from 'lodash.pick';
import { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import useSchema from './useSchema';
import useToast from './useToast';

const modulesFieldRegex = /^modules./;

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
      await form.__dirtyFields.map(async field => {
        if (field.match(modulesFieldRegex)) {
          const module = get(form, field);
          const { fields, responseFields } = schema[module.__typename];
          const fieldsNames = fields.map(field => field.name);
          const data = pick(module, fieldsNames);

          fields.forEach(field => {
            if (field.type.name === 'Asset') {
              if (data[field.name]) {
                if (data[field.name].id) {
                  delete data[field.name];
                } else {
                  const { fileName, mimeType, url, size } = data[field.name];
                  const assetData = {
                    fileName,
                    mimeType,
                    size,
                    handle: url.substring(url.lastIndexOf('/')),
                  };

                  data[field.name] = {
                    upsert: {
                      create: assetData,
                      update: assetData,
                    },
                  };
                }
              } else {
                data[field.name] = { delete: true };
              }
            }
          });

          const mutation = gql`
            mutation update${module.__typename}($id: ID!, $data: ${module.__typename}UpdateInput!) {
              update${module.__typename} (where: { id: $id }, data: $data) {
                id
                ${responseFields}
              }
            }
          `;

          await client.mutate({
            mutation,
            variables: { id: module.id, data },
          });
        }
      });

      const shouldUpdatePage = form.__dirtyFields.some(field => !field.match(modulesFieldRegex));

      if (shouldUpdatePage) {
        await client.mutate({
          mutation: updatePageMutation,
          variables: {
            id,
            data: {
              ...pick(
                form,
                schema.Page.fields.map(field => field.name),
              ),
              modulesIds: { set: form.modules.map(module => module.id) },
            },
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
