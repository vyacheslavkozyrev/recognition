import React, { Component, FormEvent } from 'react';
import { Camera } from '../../components/Camera';
import axios from 'axios';
// import { API_KEY } from '../../secrets';

import './Login.css';

type LoginProps = {
};

type LoginState = {
  pin: string,
  image: string,
  success: boolean | null,
  name: string
};

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      pin: '',
      image: '',
      success: null,
      name: ''
    }
  }

  sendImage = async (event: FormEvent) => {
    event.preventDefault();

    const response = await axios.post(`https://zcqs0q4nzg.execute-api.us-east-1.amazonaws.com/prod/identify`, {
      pin: this.state.pin,
      user_avatar: this.state.image
    });
    // }, {
    //   headers: {
    //     'x-api-key': API_KEY || ''
    //   }

    const parsedBody = JSON.parse(JSON.parse(response.data.body));

    if (parsedBody.Name) {
      this.setState({
        success: true,
        name: parsedBody.Name
      })
    }
    else {
      this.setState({
        success: false,
        name: ''
      })
    }
  }

  storeImage = (image: string) => {
    this.setState({
      ...this.state,
      image: image
    });
  }

  updatePin = (event: any) => {
    this.setState({
      ...this.state,
      pin: event.target.value
    })
  }

  render() {
    const { success, name } = this.state;

    let successMessage: JSX.Element | null = null;

    if (success) {
      successMessage = (
        <div className="status-message-box status-message-success">
          <p>Welcome {name}! You successfully recognized!</p>
        </div>
      );
    }
    else if (success === null) {
      successMessage = null;
    }
    else {
      successMessage = (
        <div className="status-message-box status-message-error">
          <p>Something went wrong! Please try again.</p>
        </div>
      );
    }

    return (
      <div className="container">

        {successMessage}

        <h1 role="heading">Verify Your Identy</h1>

        <div className="container-flex">
          <div>
            <Camera onTakePhoto={this.storeImage} />
          </div>

          <div className="container-form">
            <form onSubmit={this.sendImage}>
              <div className="form-row">
                <label htmlFor="pin">Personal Identification Number (PIN)</label>
                <input id="pin" type="text" value={this.state.pin} onChange={this.updatePin} />
              </div>
              <div className="form-row">
                <div className="button-bar">
                  <button type="submit">Verify</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
