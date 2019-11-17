import React, { Component, FormEvent } from 'react';
import './Login.css';
import { Camera } from '../../components/Camera';
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
    const response = await axios.post('https://zcqs0q4nzg.execute-api.us-east-1.amazonaws.com/prod/identify', {
      pin: this.state.pin,
      user_avatar: this.state.image
    });

    const parsedBody = JSON.parse(JSON.parse(response.data.body));
    if (parsedBody.Name) {
      this.setState({
        success: true,
        name: parsedBody.Name
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
    return (
      <div className="narrow-container">
        <div className="status-message-box status-message-error">Invalid PIN number.</div>
        <h1 role="heading">Verify Your Identy</h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="temporary-class">
              <Camera onTakePhoto={this.storeImage} />
            </div>
            <form onSubmit={this.sendImage} className="LoginForm">
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
