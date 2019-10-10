import React from 'react';
import logo from '../logo.svg';
import './Onboard.css';

const Onboard: React.FC = () => {
  return (
    <div className="Onboard">
      <header className="Onboard-header">
        <img src={logo} className="Onboard-logo" alt="logo" />
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
    </div>
  );
}

export default Onboard;
