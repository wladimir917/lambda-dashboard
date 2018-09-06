import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import './User.css'

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLogin: true
    }
  }

  componentDidMount() {
    this.setState({isLogin: this.props.isLogin});
  }

  handleCancel = (e) => {
    if(e.target.id === 'container')
      this.props.history.push('/');
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleLogin = () => {
    axios
      .post('http://localhost:8000/rest-auth/login/', {username: this.state.username, password: this.state.password})
      .then(response => {
        localStorage.setItem('token', response.data.key);
        localStorage.setItem('msg', this.state.username);
        this.props.onClickLogin( this.state.username );

      })
      .catch(err => {
        this.setState({username: '', password: ''});
      });
  };

  handleRegister = () => {
    axios
      .post('http://localhost:8000/rest-auth/register/', {username: this.state.username, password1: this.state.password, password2: this.state.password})
      .then(response => {
        localStorage.setItem('token', response.data.key);
        localStorage.setItem('msg', this.state.username);
        this.props.onClickLogin( this.state.username );
      })
      .catch(err => {
        this.setState({username: '', password: ''});
      });
  };
  ifIsLogin = () => {
    const title = (
      <div className="User-title">
        {this.state.isLogin ? 'User Login' : 'Not Register Yet?'}
      </div>
    );
    const inputs = (
      <div>
        <div className="User-input">
          <input name='username' type="text" onChange={this.handleChange} value={this.state.username} placeholder="Username" />
        </div>
        <div className="User-input">
          <input name='password' type="password" onChange={this.handleChange} value={this.state.password} placeholder="Password"/>
        </div>
      </div>
    );

    if(this.state.isLogin)
      return (
        <div>
          {title}
          {inputs}
          <button className="App-button" onClick={this.handleLogin}>Login</button>
        </div>
      )
    else
      return (
        <div>
          {title}
          {inputs}
          <button className="App-button blue" onClick={this.handleRegister}>Register</button>
        </div>
      )
  }

  render() { 
    return (
      <div id="container" className="User-container" onClick={this.handleCancel}> 
        <div className="User">
        {this.ifIsLogin()}
        </div>
      </div>
     )
  }
}
 
export default withRouter(UserLogin);
