import React, { useState } from 'react';

const AuthForm = ({ type, onSubmit, error }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'register' && password !== confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }
    const submitData = type === 'login' 
        ? { emailOrUsername: email, password }
      : { username, email, password };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="page-title">{type === 'login' ? '用户登录' : '用户注册'}</h2>
      {error && <p className="error-message">{error}</p>}
      
      {type === 'register' && (
        <div>
          <input
            type="text"
            placeholder="用户名"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
      )}
      <div>

        <input
          type={type === 'login' ? "text" : "email"}
          placeholder={type === 'login' ? "用户名或邮箱" : "邮箱地址"}
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="密码（不低于3个字符）"
          name="password"
          value={password}
          onChange={onChange}
          minLength="3"
          required
        />
      </div>
      {type === 'register' && (
        <div>
          <input
            type="password"
            placeholder="确认密码"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            minLength="3"
            required
          />
        </div>
      )}
      <button type="submit">{type === 'login' ? '登录' : '注册'}</button>
    </form>
  );
};

export default AuthForm;