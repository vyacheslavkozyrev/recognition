import React, { Component, FormEvent } from 'react';

import axios from 'axios';

import { Camera } from '../../components/Camera';

import './Onboard.css';

type OnboardProps = {
};

type OnboardState = {
  name: string,
  pin: string,
  image: string,
  success: boolean | null
};

class Onboard extends Component<OnboardProps, OnboardState> {
  constructor(props: OnboardProps) {
    super(props);

    this.state = {
      name: '',
      pin: '',
      image: '',
      success: null
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
      });
    }
    else {
      this.setState({
        ...this.state,
        success: false
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
    const { success } = this.state;

    let successMessage: JSX.Element | null = null;

    if (success) {
      successMessage = (
        <div className="status-message-box status-message-success">
          <p>You successfully onboarded!</p>
        </div>
      );
    }
    else if (success === null) {
      successMessage = null;
    }
    else {
      successMessage = (
        <div className="status-message-box status-message-error">
          <p>Something went wrong! Please try again later.</p>
        </div>
      );
    }

    return (
      <div className="container">
        {successMessage}

        <h1 role="heading">Make a Payment</h1>

        <div className="container-flex">
          <div>
            <Camera onTakePhoto={this.storeImage} />
          </div>

          <div className="container-form">
            <form onSubmit={this.sendImage}>
              <fieldset className="form-row">
                <label>Name</label>
                <input id='name' type="text" value={this.state.name} onChange={this.updateName} />
              </fieldset>
              <fieldset className="form-row">
                <label>Personal Identification Number (PIN)</label>
                <input id='pin' type="text" value={this.state.pin} onChange={this.updatePin} />
              </fieldset>
              <div className="button-bar">
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
