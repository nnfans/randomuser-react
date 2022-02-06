import { useCallback } from 'react';

const renderItem = (item) => {
  return typeof item === 'object' ? (
    <option key={item.value} value={item.value}>
      {item.label}
    </option>
  ) : (
    <option key={item}>{item}</option>
  );
};

const Select = (props) => {
  const { id, name, label, placeholder, items, value, setValue } = props;

  const handleOnChange = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="form-control"
        onChange={handleOnChange}
        value={value}
      >
        {placeholder && <option disabled>{placeholder}</option>}
        {(items || []).map(renderItem)}
      </select>
    </div>
  );
};

export default Select;
