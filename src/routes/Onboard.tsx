import React from 'react';
import logo from '../logo.svg';
import './Onboard.css';

const Onboard: React.FC = () => {
  return (
    <div className="Onboard">
      <header className="Onboard-header">
        <p>
          Edit <code>src/Onboard.tsx</code> and save to reload.
        </p>
        <a
          className="Onboard-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="content">
        <div className="userHeader">
          <img src={logo} className="Onboard-logo userImage" alt="logo" />
          <h2>Vyacheslav Kozyrev</h2>
        </div>
      </div>
    </div>
  );
}

export default Onboard;
