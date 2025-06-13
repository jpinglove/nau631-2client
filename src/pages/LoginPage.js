import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../authContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (formData) => {
    try {
      setError('');
      await login({ emailOrUsername: formData.emailOrUsername, password: formData.password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || '登录失败，请重试。');
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} error={error} />;
};

export default LoginPage;