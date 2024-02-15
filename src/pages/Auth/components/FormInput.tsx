import React, { useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { ILoginRequestDTO } from '../../../submodules/public-common/interfaces/dto/auth/iadmin-login-request.interface';

// models
interface InputProps {
  label: string,
  name: string,
  placeholder?: string,
  type: string,
  // eslint-disable-next-line
  validationSchema: any,
  // eslint-disable-next-line
  register: any,
  watchValue?: any,
  errors?: FieldErrors<ILoginRequestDTO>;
}

export default function FormInput({ label, name, register, errors, placeholder, type, validationSchema } : InputProps) {
  return (
    <div className='input-form-container'>
      <label htmlFor={name} className='input-form-label'>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validationSchema)}
        className='input-form'
      />
      {errors && errors[name] && (
        <span className="input-form-error">{errors[name]?.message}</span>
      )}
    </div>
  );
}
export function FormInputPassword({
  label,
  watchValue,
  name,
  register,
  errors,
  placeholder,
  type,
  validationSchema,
} : InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleIconClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='input-form-container'>
      <label htmlFor={name} className='input-form-label'>{label}</label>
      <div className="input-form-with-icon">
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          {...register(name, validationSchema)}
          className='input-form'
        />
        { watchValue && <div className="input-eye-icn" onClick={handleIconClick} />}
      </div>
      {errors && errors[name] && (
        <span className="input-form-error">{errors[name]?.message}</span>
      )}
    </div>
  );
}
