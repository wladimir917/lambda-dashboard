import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import UserLogin from './components/user/UserLogin';
import StudentReport from './components/studentReport/StudentReport';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      message: '',
    }
  }

  componentDidMount() {
    // get the token from somewhere
    const token = localStorage.getItem('token');
    const msg = localStorage.getItem('msg');

    this.setState({ isLogged: token, message: msg});
  }

  handleOnClickLogin = (event) => {
    this.props.history.push('/login');
  }

  handleOnClickRegister = (event) => {
    this.props.history.push('/register');
  }

  handleOnClickLogout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.props.history.push('/');
    this.setState({ isLogged: false });
  };

  handleSubmitLogin = (msg) => {
    this.setState({ isLogged: true, message: msg});
    this.props.history.push('/dashboard');
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> FSW Progress Report </h1>
          {this.state.isLogged && <h1 className="App-user">{this.state.message}</h1>}
        </header>
        {!this.state.isLogged && <div>
          <button className="App-button" onClick={this.handleOnClickLogin}>Login</button>
          <button className="App-button blue" onClick={this.handleOnClickRegister}>Register</button>
        </div>}
        {this.state.isLogged && <div>
          <button className="App-button red" onClick={this.handleOnClickLogout}>Logout</button>
        </div>}
        <Route path="/login" render={() => <UserLogin isLogin={true} onClickLogin={this.handleSubmitLogin}/>} />
        <Route path="/register" render={() => <UserLogin isLogin={false} onClickLogin={this.handleSubmitLogin}/>} />
        <Route path="/dashboard" render={() => <StudentReport studentName={'Fausto Fraga'} currentSection={ 'CS10'  } projectManager={'Nikhil Kamineni'} icon="assignment_turned_in" submittedSprints={ 16 } passedSprints={ 21 }/>} />
      </div>
    );
  }
}

export default withRouter(App);
