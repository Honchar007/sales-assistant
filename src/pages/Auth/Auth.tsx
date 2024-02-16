import React, { useEffect } from 'react';

// components
import LoginForm from './components/LoginForm';

// store
import { useAppSelector } from '../../redux/hook';
import { selectIsLogin } from '../../redux/authSlicer';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const isLogged = useAppSelector(selectIsLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/feed');
    }
  }, []);

  return (
    <div className='auth-wrapper'>
      <LoginForm />
      <div className='background'></div>
    </div>
  );
}

export default Auth;
