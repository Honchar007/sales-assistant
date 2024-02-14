import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// components
import FormInput from './FormInput';

// models
import { ILoginRequestDTO } from '../../../submodules/public-common/interfaces/dto/auth/iadmin-login-request.interface';


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginRequestDTO>();
  const onSubmit: SubmitHandler<ILoginRequestDTO> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className='login-wrapper'>
      <div className='naming'>
        <span className='logo'></span>
        <span className='name'>Sales Assistant</span>
      </div>
      <h2 className='login-text'>Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='form-wrapper'
      >
        <FormInput
          name='email'
          placeholder='Email'
          type='text'
          errors={errors}
          validationSchema={{
            required: 'required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          }}
          register={register}
        />
        <FormInput
          name='password'
          placeholder='Password'
          type='password'
          errors={errors}
          validationSchema={{
            required: 'required',
            minLength: {
              value: 3,
              message: 'Please enter a minimum of 3 characters',
            },
          }}
          register={register}
        />
        <button
          type='submit'
          className='button-submit'
        >
          Log in
        </button>
      </form>
    </div>
  );
}
