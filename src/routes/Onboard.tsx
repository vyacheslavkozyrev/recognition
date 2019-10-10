import React from 'react';
import logo from '../logo.svg';
import './Onboard.css';

const Onboard: React.FC = () => {
  const sendImage = () => {
    console.log('sending image...')
  }

  return (
    <div className="Onboard">
      <header className="Onboard-header">
        <p>
          Edit <code>src/Onboard.tsx</code> and save to reload.
        </p>
        <button onClick={sendImage}>
          Learn React
        </button>
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
