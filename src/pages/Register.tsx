import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="bg-neutral-50 min-h-screen py-16">
      <div className="container-custom">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;