import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/dashboard">仪表盘 ({user.username})</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{background:'none', border:'none', color:'white', cursor:'pointer', fontSize:'1em'}}>退出登录</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">登录</Link>
            </li>
            <li>
              <Link to="/register">注册</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;