import React, { Component, Fragment } from 'react';
import UserService from '../../services/userService';
import './chat.css'

class MessagesBlock extends Component {

    sortedMessages = [];
    state = {
        message: ''
    }

    handleChange = (event) => {
        this.setState({message: event.target.value});
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.sendMessage()
    }

    sendMessage = () => {
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

    sendMessageAsReplay = (parent_message_id) => {
        // UserService.sendMessageAsReplay(parent_message_id)
    }

    sortMessages = () => {
        this.sortedMessages = []

        const { messages } = this.props;

        messages.forEach(message => {
            if(!message.parent_message_id){
                let arrayComents = []
                messages.forEach(comment => {
                    if(comment?.parent_message_id && comment.parent_message_id === message._id){
                        arrayComents.push(comment)
                    }
                });

                const newObj = {...message, comments:[]}
                newObj.comments = arrayComents
                this.sortedMessages.push(newObj)
            }
        });
    }


    _renderMessage = (messages) => {
        this.sortMessages()

        
        return this.sortedMessages.map(elem => {
            if(elem.comments.length){
                return(
                    <div className="container-list-messages" key={elem.date_sent}>
                        <div className="container-message" key={elem.date_sent}>
                            <p>
                                {elem.message}
                            </p>
                            <span onClick={() => this.sendMessageAsReplay(elem._id)}>
                                replay
                            </span>
                        </div>

                        <div className="comments-messages">
                            {elem.comments.map(item => {
                                return(
                                    <div className="container-message" key={item.date_sent}>
                                        <p>
                                            {item.message}
                                        </p>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                )
            } else {
                return(
                    <div className="container-message" key={elem.date_sent}>
                        <p>
                            {elem.message}
                        </p>
                        <span onClick={() => this.sendMessageAsReplay(elem._id)}>
                            replay
                        </span>
                    </div>
                )
            }
            
        })  
    }


    render() {
        const { message } = this.state
        const { messages } = this.props
        return (
            <Fragment>
                <div className="messages-block">
                    {this._renderMessage(messages)}
                </div>

                <div className="send-message-block">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input type="text" value={message} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Send" />
                    </form>
                </div>
            </Fragment>  
        );
    }
}

export default MessagesBlock;