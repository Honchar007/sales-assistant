import React, { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function StyledInput({ type, name, label, placeholder, value, onChange, error } : InputProps) {
  return (
    <div className='input-container'>
      {label && <label htmlFor={name} className='input-label'>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='input'
      />
      {error && <span className='input-error'>{error}</span>}
    </div>
  );
}
