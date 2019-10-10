import React, { Component, FormEvent } from 'react';

import axios from 'axios';

import './Onboard.css';
import { Camera } from '../components/Camera';
import { Redirect } from 'react-router';

type OnboardProps = {
};

type OnboardState = {
  name: string,
  pin: string,
  image: string,
  success: boolean
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

    const { name, pin, image } = this.state;

    const response: any = await axios.post('https://zcqs0q4nzg.execute-api.us-east-1.amazonaws.com/prod/create', {
      username: name,
      pin: pin,
      user_avatar: image
    });

    if (response.status === 200) { // success
      this.setState({
        ...this.state,
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
      name: event.target.value
    })
  }

  updatePin = (event: any) => {
    this.setState({
      ...this.state,
      pin: event.target.value
    })
  }

  render() {
    const successMessage: JSX.Element | null = this.state.success ? (
      <p>You successfully onboarded!!!</p>
    ) : null;

    return (
      <div className="Onboard">
        <div className="content">
          <div className="userHeader">
            <Camera onTakePhoto={this.storeImage} />
            <div className="rightPanel">
              <h1>Create Profile</h1>
              {successMessage}
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
