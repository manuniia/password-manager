var React = require("react");

function InputField({
  label,
  name,
  error,
  required = false,
  defaultValue,
  type = "text",
  ...props
}) {
  return (
    <>
      <label htmlFor={name}>{label ? label : name}</label>
      <input
        name={name}
        id={name}
        required={required}
        aria-invalid={error ? true : undefined}
        defaultValue={defaultValue}
        type={type}
        {...props}
      />
      {error ? <small>{error}</small> : null}
    </>
  );
}

module.exports = InputField;
