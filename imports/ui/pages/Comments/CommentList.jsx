import React from 'react';
import {Meteor} from 'meteor/meteor';
import {AutoForm, LongTextField} from 'uniforms-unstyled';
import PropTypes from 'prop-types';
import {Tracker} from 'meteor/tracker';

import CommentView from './CommentView';
import FormSchema from './schema';
import listCommentsQuery from '/imports/api/comments/queries/listComments';

export default class CommentList extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: null
        };
        this.renderComments = this.renderComments.bind(this);
    }

    submit = (comment) => {
        comment.postId = this.props.postId;
        Meteor.call('secured.comment_create', comment, (err) => {
            if (err) {
                return alert(err);
            }
        });
    };

    componentDidMount() {
        const query = listCommentsQuery.clone({postId:this.props.postId});
        const subscriptionHandle = query.subscribe();
        this.commentsTracker = Tracker.autorun(() => {
            if(subscriptionHandle.ready()) {
                const comments = query.fetch();
                this.setState({comments});
            }
        });
    }

    componentWillUnmount() {
        this.commentsTracker.stop();
    }
 
    renderComments() {
        return this.state.comments.map((comment) => {
            return (
                <CommentView key={comment._id} comment={comment}/>
            );
        });
    }

    render() {
        const {comments} = this.state;
        if (!comments) {
            return <div>0 comments</div>;
        }
        return (
            <div>
                <p>{(comments.length)} comments</p>
                <AutoForm onSubmit={this.submit} schema={FormSchema}>
                    <LongTextField name="text"/>
                    <button type="submit">Add</button>
                </AutoForm>
                {this.renderComments()};
            </div>
        );
    }
}

CommentList.propTypes = {
    postId: PropTypes.string.isRequired
}