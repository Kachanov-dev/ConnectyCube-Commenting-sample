import React, { Component } from 'react';
import Loader from './Loader';
import Chat from './Chat';
import './css/App.css';
import UserService from '../services/userService'


export default class App extends Component{
  componentDidMount(){

    console.warn('componentDidMount');
    UserService.init()
  }

  render(){
    return (
      <div className="App">
        <Loader />
        <Chat />
      </div>
    );
  }
}

