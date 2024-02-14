import React, { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function Input({ type, name, label, placeholder, value, onChange, error } : InputProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span>{error}</span>}
    </div>
  );
}
