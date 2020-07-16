import React, { Component } from 'react';
import './chat.css'

class MessagesBlock extends Component {

    _renderMessage = () => {
        const { messages } = this.props
        return messages.map(elem => {
            return(
                <div className="container-message" key={elem.date_sent}>
                    <p>
                        {elem.message}
                    </p>
                </div>
            )
        })  
    }

    render() {
        return (
            <div className="messages-block">
                {this._renderMessage()}
            </div>
        );
    }
}

export default MessagesBlock;