import { useState } from 'react';
import set from 'lodash.set';

function useForm() {
  const [form, setForm] = useState();

  function setInitialValues(initialValues) {
    setForm({ __dirtyFields: [], ...initialValues });
  }

  function onFieldChange(field, value) {
    setForm(
      set(
        {
          ...form,
          __dirtyFields: [...form.__dirtyFields, field],
        },
        field,
        value,
      ),
    );
  }

  return [form, setInitialValues, onFieldChange];
}

export default useForm;
