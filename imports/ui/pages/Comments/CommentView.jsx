import React from 'react';
import {Meteor} from 'meteor/meteor';

export default class commentView extends React.Component {

    delete(_id) {
        Meteor.call('secured.comment_remove', _id, (err) => {
            if (err) {
                console.log(err);
            }
        });
    };

    renderDelete() {
        if ((Meteor.userId() === this.props.comment.users._id) ||
            (Meteor.userId() === this.props.comment.posts.userId)) {
            return (
                <button onClick={() => {this.delete(this.props.comment._id);}}>Delete</button>
            );
        }
        return undefined;
    }




    render() {
        return (
            <div>
                <div>{this.props.comment.text}</div>
                <div>email: {this.props.comment.users.emails[0].address}</div> 
                {this.renderDelete()}
            </div>
        );
    }
}