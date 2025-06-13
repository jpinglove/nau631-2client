import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../authContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (formData) => {
    try {
      setError('');
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || '注册失败，请重试。');
      console.error('注册错误:', err.response?.data || err.message);
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} error={error} />;
};

export default RegisterPage;