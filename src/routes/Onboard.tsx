import React, { Component, FormEvent } from 'react';
import logo from '../logo.svg';
import './Onboard.css';
import { Camera } from '../components/Camera';
import { Redirect } from 'react-router';
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
  sendImage = async (event: FormEvent) => {
    event.preventDefault();
    console.log(this.state)
    const response = await axios.post('https://zcqs0q4nzg.execute-api.us-east-1.amazonaws.com/prod/create', {
      username: this.state.name,
      pin: this.state.pin,
      user_avatar: this.state.image
    });

    console.log(response)
    if (response.success) {
      this.setState({
        success: true
      })
    }
  }

  storeImage = (image: string) => {
    this.setState({
      ...this.state,
      image: image
    });
  }

  updateName = (event: any) => {
    this.setState({
      ...this.state,
      name: this.state.name + event.nativeEvent.data
    })
  }

  updatePin = (event: any) => {
    this.setState({
      ...this.state,
      pin: this.state.pin + event.nativeEvent.data
    })
  }

  render() {
    return (
      <div className="Onboard">
        <div className="content">
          <div className="userHeader">
            <Camera onTakePhoto={this.storeImage} />
            <div className="rightPanel">
              <h1>Create Profile</h1>
            <form onSubmit={this.sendImage} className="onboardForm">
              <div className="formGroup">
                <span>User Name: </span>
                <input id='name' type="text" value={this.state.name} onChange={this.updateName} />
              </div>
              <div className="formGroup">
                <span>PIN: </span>
                <input id='pin' type="text" value={this.state.pin} onChange={this.updatePin} />
              </div>
              <button type="submit">
                Submit Profile
              </button>
            </form>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Onboard;
