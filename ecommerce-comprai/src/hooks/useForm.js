import { useState } from "react";

/**
 * Estado de formulário controlado com validação no envio.
 * @param {Object} initialValues - valores iniciais dos campos.
 * @param {Function} validate - recebe os valores e devolve { campo: mensagem }.
 * @returns {{ values: Object, errors: Object, handleChange: Function, handleSubmit: Function }}
 *   handleChange(nome, valor) atualiza um campo; handleSubmit(onValid) devolve o onSubmit do form.
 */
export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function handleChange(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(onValid) {
    return (event) => {
      event.preventDefault();
      const foundErrors = validate(values);
      setErrors(foundErrors);
      if (Object.keys(foundErrors).length === 0) onValid(values);
    };
  }

  return { values, errors, handleChange, handleSubmit };
}
