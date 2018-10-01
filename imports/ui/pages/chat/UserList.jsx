import React from 'react';
import {Meteor} from 'meteor/meteor';

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

    listUsers = () => {
        return (
            this.state.users.map(user => {
                return <div key={user._id}>{user._id}</div>
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