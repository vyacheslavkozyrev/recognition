import React, { Component } from 'react';
import logo from '../logo.svg';
import './Onboard.css';
import { Camera } from '../components/Camera';
const axios = require('axios').default;

type OnboardProps = {
};

type OnboardState = {
  name: String,
  pin: Number | null,
  image: String,
  success: Boolean
};

class Onboard extends Component<OnboardProps, OnboardState> {
  constructor(props: OnboardProps) {
    super(props);
    this.state = {
      name: '',
      pin: null,
      image: '',
      success: false
    }
  }
  sendImage = async () => {
    console.log('sending image...')
    const response = await axios.post('https://zcqs0q4nzg.execute-api.us-east-1.amazonaws.com/prod/create',{name: 'jimmy', pin: 1234, image: this.state.image});
  }

  storeImage = () => {
    console.log('storing image...')
  }

  render() {
    return (
      <div className="Onboard">
        <header className="Onboard-header">
          <h1>Create Profile</h1>
        </header>
        <div className="content">
          <div className="userHeader">
            <img src={'data:image/jpg;base64, '+jimmyImage} className="Onboard-logo userImage" alt="logo" />
            <h2>Vyacheslav Kozyrev</h2>
          </div>
          <div className="cameraInteractions">
            <form onSubmit={this.sendImage}>
              <Camera onTakePhoto={this.storeImage} />
              <button type="submit">
                Submit Picture
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Onboard;
