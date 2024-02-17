import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// store
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { login, selectIsLogin } from '../../../redux/authSlicer';

// components
import FormInput, { FormInputPassword } from './FormInput';

// models
import { ILoginRequestDTO } from '../../../submodules/public-common/interfaces/dto/auth/iadmin-login-request.interface';
import StyledButton from '../../../components/StyledButton';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLogged = useAppSelector(selectIsLogin);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequestDTO>();
  const onSubmit: SubmitHandler<ILoginRequestDTO> = async (data) => {
    await dispatch(login(data));
    navigate('/feed');
  };

  useEffect(()=>{
    if (isLogged) navigate('/feed');
  }, [isLogged]);

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
          label='Email'
          name='email'
          placeholder='Email'
          type='text'
          errors={errors}
          validationSchema={{
            required: 'Required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email format',
            },
          }}
          register={register}
        />
        <FormInputPassword
          label='Password'
          name='password'
          placeholder='Password'
          type='password'
          errors={errors}
          watchValue={watch('password')}
          validationSchema={{
            required: 'Required',
            minLength: {
              value: 3,
              message: 'Please enter a minimum of 3 characters',
            },
          }}
          register={register}
        />
        <StyledButton
          type='submit'
        >
          Log in
        </StyledButton>
      </form>
    </div>
  );
}
