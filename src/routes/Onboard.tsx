import React, { Component } from 'react';
import logo from '../logo.svg';
import './Onboard.css';
import { Camera } from '../components/Camera';
const axios = require('axios').default;

type OnboardProps = {
};

type OnboardState = {
  name: string,
  pin: string,
  image: string,
  success: Boolean
};

class Onboard extends Component<OnboardProps, OnboardState> {
  constructor(props: OnboardProps) {
    super(props);
    this.state = {
      name: '',
      pin: '',
      image: '',
      success: false
    }
  }
  sendImage = async () => {
    console.log('sending image...')
    const response = await axios.post(
      'https://zcqs0q4nzg.execute-api.us-east-1.amazonaws.com/prod/create', {
        username: this.state.name,
        pin: this.state.pin,
        user_avatar: this.state.image
      });
    console.log(response)
  }

  storeImage = (event: Event, image: string) => {
    console.log('storing image...')
    this.setState({
      image
    });
  }

  render() {
    return (
      <div className="Onboard">
        <header className="Onboard-header">
          <h1>Create Profile</h1>
        </header>
        <div className="content">
          <div className="userHeader">
            {!this.state.image ?
              <Camera onTakePhoto={this.storeImage} /> :
              <img src={this.state.image ? this.state.image : logo} className="Onboard-logo" alt="Profile picture" />
            }
            <form onSubmit={this.sendImage}>
              <button type="submit">
                Submit Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Onboard;
