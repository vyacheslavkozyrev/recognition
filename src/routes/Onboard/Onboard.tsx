import React, { Component, FormEvent } from 'react';

import axios from 'axios';

import { Camera } from '../../components/Camera';
import { Redirect } from 'react-router';

import './Onboard.css';

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
      <p>You successfully onboarded.</p>
    ) : null;

    return (
      <div className="container">
        <div>{successMessage}</div>
        <h1 role="heading">Make a Payment</h1>
        <div>
          <div>
            <Camera onTakePhoto={this.storeImage} />
          </div>
          <div>
            <form onSubmit={this.sendImage}>
              <div>
                <label>Name</label>
                <input id='name' type="text" value={this.state.name} onChange={this.updateName} />
              </div>
              <div>
                <label>Personal Identification Number (PIN)</label>
                <input id='pin' type="text" value={this.state.pin} onChange={this.updatePin} />
              </div>
              <div>
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Onboard;
