import React, { Component } from 'react';
import Loader from './Loader';
import Chat from './Chat';
import './css/App.css';
import UserService from '../services/userService'


export default class App extends Component{
  state = {
    isFetchMessages: false
  }

  componentDidMount(){
    UserService.init().then(() => {
      this.setState({isFetchMessages: true})
    })
  }

  render(){
    const { isFetchMessages } = this.state
    return (
      <div className="App">
        {isFetchMessages ?
          <Chat /> :
          <Loader /> 
        }     
      </div>
    );
  }
}

