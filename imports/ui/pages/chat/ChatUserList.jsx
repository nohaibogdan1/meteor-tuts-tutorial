import React from 'react';
import {Meteor} from 'meteor/meteor';

import MessageListContainer from '../messages/MessageListContainer';
import ChatUser from './ChatUser';

export default class UserList extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true
        }
    }

    componentDidMount() {
        Meteor.call('user.list', (err, users) => {
            if (err) {
                return console.log(err);
            }
            this.setState({users, loading: false});
        });
    }

    sendUserId = (otherUserId) => {
        this.props.getMessages(otherUserId);
    }

    listUsers = () => {
        return (
            this.state.users.map(user => {
                return <ChatUser 
                    key={user._id} 
                    otherUserId={user._id}
                    sendUserId={this.sendUserId}
                    emailAddress={user.emailAddress}/>
            })
        )
    }

    render() {
        const {loading} = this.state;
        if (loading) {
            return <div>Loading ...</div>
        }
        return (
            <div>
                {this.listUsers()}
            </div>
        )
    }
}