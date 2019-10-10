import React from 'react';
import logo from '../logo.svg';
import './Login.css';

const Login: React.FC = () => {
  return (
    <div className="Login">
      <header className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
        <p>
          Edit <code>src/Login.tsx</code> and save to reload.
        </p>
        <a
          className="Login-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Login;
