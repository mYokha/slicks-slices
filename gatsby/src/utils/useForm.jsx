import React from 'react';

export default function useForm(defaults) {
  const [values, setValues] = React.useState(defaults);

  function updateValue(e) {
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setValues({
      ...values,
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
