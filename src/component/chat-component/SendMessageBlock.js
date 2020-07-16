import React, { Component } from 'react';
import UserService from '../../services/userService';
import './chat.css';

class SendMessageBlock extends Component {
    state = {
        message: ''
    }

    handleChange = (event) => {
        this.setState({message: event.target.value});
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.sendMessages()
    }

    sendMessages = () => {
        const { message } = this.state
        const { uiSendMessages } = this.props

        if(!message.length){
            return
        }

        uiSendMessages(true)

        UserService.sendMessage(message).then(() => {
            this.setState({message: ''})
            uiSendMessages(false)
        })
        
    }

    render() {
        const { message } = this.state
        return (
            <div className="send-message-block">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" value={message} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    }
}

export default SendMessageBlock;