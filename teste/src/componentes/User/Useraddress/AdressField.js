import React from 'react';
import './Useradress.css';

function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const AddressField = ({
  label,
  value,
  onChange,
  disabled,
  onBlur,
  type = 'text',
}) => {
  const sanitizedLabel = removeAccents(label);

  return (
    <div>
      <label className="label-endereco">{label}:</label>
      <input
        className={`dados-endereco ${sanitizedLabel.toLowerCase()}`}
        type={type}
        value={value}
        onChange={(e) => onChange(e, sanitizedLabel.toLowerCase())}
        disabled={disabled}
        onBlur={onBlur}
      />
    </div>
  );
};

export default AddressField;