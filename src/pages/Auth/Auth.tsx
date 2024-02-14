import React from 'react';

// components
import LoginForm from './components/LoginForm';

function Auth() {
  return (
    <div className='auth-wrapper'>
      <LoginForm />
      <div className='background'></div>
    </div>
  );
}

export default Auth;
