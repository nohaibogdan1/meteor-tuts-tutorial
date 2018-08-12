import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

export default class CommentView extends React.Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        Meteor.call('secured.comment_remove', this.props.comment._id, (err) => {
            if (err) {
                alert(err);
            }
        });
    }

    renderDelete() {
        if ((Meteor.userId() === this.props.comment.users._id) ||
            (Meteor.userId() === this.props.comment.posts.userId)) {
            return (
                <button onClick={this.delete}>Delete</button>
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

CommentView.propTypes = {
    comment: PropTypes.object.isRequired
}