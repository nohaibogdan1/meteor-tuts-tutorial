import React from 'react';

import UserList from './UserList';
import MessageListContainer from '../messages/MessageListContainer';

export default class ChatLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            otherUserId: '0'
        }
    }

    getMessages = (otherUserId) => {
        console.log('getMessages', otherUserId);

        this.setState({otherUserId});
    }

    render() {
        const {otherUserId} = this.state;
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '0px auto',
                width: '90rem'
            }}>
                <div style={{
                    backgroundColor: 'red',
                    width: '30rem',
                }}>
                    <UserList getMessages={this.getMessages}/>
                </div>

                <div style={{
                    backgroundColor: 'blue',
                    width:'70rem'
                }}>
                    <MessageListContainer otherUserId={otherUserId}/>
                </div>
            </div>
        )
    }
}