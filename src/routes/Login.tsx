import React, { Component, FormEvent } from 'react';
import logo from '../logo.svg';
import './Login.css';
import { Camera } from '../components/Camera';
const axios = require('axios').default;

type LoginProps = {
};

type LoginState = {
  pin: string,
  image: string,
  success: Boolean,
  name: string
};

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      pin: '',
      image: '',
      success: false,
      name: ''
    }
  }
  sendImage = async (event: FormEvent) => {
    event.preventDefault();
    console.log(this.state)
    const response = await axios.post('https://zcqs0q4nzg.execute-api.us-east-1.amazonaws.com/prod/identify', {
      pin: this.state.pin,
      user_avatar: this.state.image
    });

    console.log(response)
    if (response.data.statusCode === 200) {
      this.setState({
        success: true,
        name: response.data.username
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
      pin: this.state.pin + event.nativeEvent.data
    })
  }

  render() {
    return (
      <div className="Login">
        <div className="content">
          <div className="userHeader">
            <Camera onTakePhoto={this.storeImage} />
            <div className="rightPanel">
              <h1>Make a Payment</h1>
              <form onSubmit={this.sendImage} className="LoginForm">
                <div className="formGroup">
                  <span>PIN: </span>
                  <input id='pin' type="text" value={this.state.pin} onChange={this.updatePin} />
                </div>
                <button type="submit">
                  Verify
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
