import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Mail, Lock, LogIn } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { login, isLoading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Error is handled by the AuthContext
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-card max-w-md w-full mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <ChefHat size={32} className="text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <p className="text-neutral-600 mt-1">Log in to access your recipes</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-error-100 text-error-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="label">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-neutral-400" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input pl-10"
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-error-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="label">Password</label>
            <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-neutral-400" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-10"
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="text-error-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full"
        >
          {isLoading ? (
            <>
              <div className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <LogIn size={18} />
              <span>Log In</span>
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-neutral-600">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;