import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { ILoginRequestDTO } from '../../../submodules/public-common/interfaces/dto/auth/iadmin-login-request.interface';

// models
interface InputProps {
  name: string,
  placeholder?: string,
  type: string,
  validationSchema: any,
  // eslint-disable-next-line
  register: any,
  errors?: FieldErrors<ILoginRequestDTO>;
}

export default function FormInput({ name, register, errors, placeholder, type, validationSchema } : InputProps) {
  return (
    <div className='input-form-container'>
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
