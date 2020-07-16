import React, { Component } from 'react';
import MessagesBlock from './chat-component/MessagesBlock';
import UserService from '../services/userService';
import Loader from '../component/loader/loader'
import './css/App.css';

export default class Chat extends Component{
  constructor(props){
    super(props)
    this.state = {
      messages: UserService.getMessages(),
      isLoader: false
    }
  }

  uiSendMessages = (status) => {
    if(status){
      this.setState({isLoader: true})
    } else {
      this.setState({ messages: UserService.getMessages(), isLoader: false})
    }

  }

  render() {
    const { messages, isLoader } = this.state
    return (
      <div className="chat-wrap">
        {isLoader &&
          <div className="chat-loader">
            <Loader />
          </div>
        }
        <MessagesBlock  messages={messages} uiSendMessages={this.uiSendMessages}/>
      </div>
    );
  };
};