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
                <button className="btn btn-danger btn-sm" style={{marginTop: '10px'}} onClick={this.delete}>Delete</button>
            );
        }
        return undefined;
    }

    render() {
        return (
            <div style={{
                        marginTop:'20px', 
                        borderTop:'solid 1px rgba(13, 255, 235, 0.2)', 
                        borderBottom:'solid 1px rgba(13, 255, 235, 0.2)',
                        paddingBottom:'5px'}}>
                <div>{this.props.comment.text}</div>
                <div style={{marginTop: '10px'}}>email: {this.props.comment.users.emails[0].address}</div>
                <div style={{marginTop: '10px'}}>{this.renderDelete()}</div>
            </div>
        );
    }
}

CommentView.propTypes = {
    comment: PropTypes.object.isRequired
}