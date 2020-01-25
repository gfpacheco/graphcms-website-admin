import { useState } from 'react';

function useForm() {
  const [form, setForm] = useState();
  const onFieldChange = (field, value) =>
    setForm({
      ...form,
      [field]: value,
    });

  return [form, setForm, onFieldChange];
}

export default useForm;
