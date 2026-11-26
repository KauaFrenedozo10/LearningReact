/**
 * Campo de formulário acessível: rótulo ligado ao input, erro anunciado e ligado por aria-describedby.
 * @param {Object} props
 * @param {string} props.name - nome do campo (também usado no id).
 * @param {string} props.label - texto do rótulo.
 * @param {string|number} props.value - valor atual (controlado).
 * @param {Function} props.onChange - chamada como onChange(name, novoValor).
 * @param {string} [props.type] - text, number, email, tel, textarea ou select.
 * @param {Array} [props.options] - opções do select (textos ou { value, label }).
 * @param {string} [props.placeholder] - primeira opção (vazia) do select.
 * @param {Function} [props.mask] - transforma o texto digitado (ex.: maskCpf).
 * @param {string} [props.error] - mensagem de erro.
 */
export default function FormField({
  name,
  label,
  value,
  onChange,
  type = "text",
  options = [],
  placeholder = "Selecione...",
  mask,
  error,
  hint,
  ...inputProps
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(" ") || undefined;

  const commonProps = {
    id,
    name,
    value,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy,
    onChange: (event) => onChange(name, mask ? mask(event.target.value) : event.target.value),
    ...inputProps,
  };
  const className = error ? "is-invalid" : "";

  let control;
  if (type === "select") {
    control = (
      <select className={`form-select ${className}`} {...commonProps}>
        <option value="">{placeholder}</option>
        {options.map((option) => {
          // Aceita "SP" ou { value: 1, label: "Maria" }.
          const optionValue = typeof option === "object" ? option.value : option;
          const optionLabel = typeof option === "object" ? option.label : option;
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    );
  } else if (type === "textarea") {
    control = <textarea className={`form-control ${className}`} rows={3} {...commonProps} />;
  } else {
    control = <input type={type} className={`form-control ${className}`} {...commonProps} />;
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {control}
      {hint && (
        <div id={hintId} className="form-text">
          {hint}
        </div>
      )}
      {error && (
        <div id={errorId} className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
}
