import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="bg-neutral-50 min-h-screen py-16">
      <div className="container-custom">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;