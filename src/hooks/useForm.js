import { useState } from 'react';
import set from 'lodash.set';

function useForm() {
  const [form, setForm] = useState();

  function setInitialValues(initialValues) {
    setForm({ ...initialValues, __dirtyFields: [] });
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
