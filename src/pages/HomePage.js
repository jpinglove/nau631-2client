import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../authContext';

const HomePage = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="page-title">欢迎来到由NAU学生纪平开发的631-1高阶作业示例!</h1>
      <p style={{textAlign: "center"}}>这是一个演示用户认证和CRUD操作的简单应用。</p>
      <p style={{textAlign: "center"}}>功能包括：用户注册、登陆、修改密码；以及物品的增删改查功能</p>
      {!user && (
        <p style={{textAlign: "center"}}>
          请 <Link to="/login">登录</Link> 或 <Link to="/register">注册</Link> 以继续。
        </p>
      )}
       {user && (
        <p style={{textAlign: "center"}}>
          前往您的 <Link to="/dashboard">仪表盘</Link>。
        </p>
      )}
    </div>
  );
};

export default HomePage;