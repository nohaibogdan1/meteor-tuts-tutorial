import React from 'react';

import UserList from './UserList';
import MessageList from '../messages/MessageList';

export default ChatLayout = (props) => {
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
                <UserList/>
            </div>

            <div style={{
                backgroundColor: 'blue',
                width:'70rem'
            }}>
                <MessageList/>
            </div>
        </div>
    )
}