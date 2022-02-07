import { useCallback } from 'react';

const Input = (props) => {
  const { id, name, label, type, placeholder, value, setValue, className } =
    props;

  const handleOnChange = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <div className={className || ''}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type || 'text'}
        className="form-control"
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder || ''}
      />
    </div>
  );
};

export default Input;
