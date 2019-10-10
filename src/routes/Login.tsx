import React from 'react';
import './Login.css';

import { Camera } from '../components/Camera';

const Login: React.FC = () => {
  return (
    <Camera onTakePhoto={()=>{}}/>
  );
}

export default Login;
