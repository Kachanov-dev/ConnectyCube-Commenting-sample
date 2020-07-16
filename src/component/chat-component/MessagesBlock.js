import React, { Component, Fragment } from 'react';
import UserService from '../../services/userService';
import Modal from 'react-modal';
import './chat.css'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class MessagesBlock extends Component {

    sortedMessages = [];

    selected_parent_message_id = null;
    
    state = {
        message: '',
        isModal: false,
        comment: ''
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    handleChange = (event) => {
        this.setState({message: event.target.value});
    }

    handleChangeComment = (event) => {
        this.setState({comment: event.target.value});
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.sendMessage()
    }

    handleSubmitCommint = (event) => {
        event.preventDefault();
        this.sendMessageAsReplay()
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

    sendMessageAsReplay = () => {
        const { uiSendMessages } = this.props
        this.setState({isModal:false, comment: ''})
        uiSendMessages(true)
        UserService.sendMessageAsReplay(this.state.comment, this.selected_parent_message_id).then(() => {
            uiSendMessages(false)
        })
    }

    openModal = (parent_message_id) => {
        this.selected_parent_message_id = parent_message_id
        this.setState({isModal: true})
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


    _renderMessage = () => {
        this.sortMessages()
        
        return this.sortedMessages.map(elem => {
            if(elem.comments.length){
                return(
                    <div className="container-list-messages" key={elem.date_sent}>
                        <div className="container-message" key={elem.date_sent}>
                            <p>
                                {elem.message}
                            </p>
                            <span onClick={() => this.openModal(elem._id)}>
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
                        <span onClick={() => this.openModal(elem._id)}>
                            replay
                        </span>
                    </div>
                )
            }
            
        })  
    }

    closeModal = () => {
        this.selected_parent_message_id = null
        this.setState({isModal: false})
    }


    render() {
        const { message, isModal, comment } = this.state
        const { messages } = this.props
        return (
            <Fragment>
                <div className="messages-block">
                    {this._renderMessage(messages)}
                </div>

                <Modal
                    isOpen={isModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                    <div className="send-as-comment">
                        <button onClick={this.closeModal}>close</button>
                    </div>
                    <div>left comment</div>
                    <form onSubmit={this.handleSubmitCommint}>
                        <label>
                            <input type="text" value={comment} onChange={this.handleChangeComment} />
                        </label>
                        <input type="submit" value="Send" />
                    </form>
                    </Modal>

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