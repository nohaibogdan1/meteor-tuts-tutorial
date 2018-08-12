import React from 'react';
import {Meteor} from 'meteor/meteor';
import {AutoForm, LongTextField} from 'uniforms-unstyled';
import PropTypes from 'prop-types';
import CommentView from './CommentView';
import FormSchema from './schema';

import {Tracker} from 'meteor/tracker';
import {listCommentsQuery} from '/imports/db/queries';





export default class CommentList extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: null
        };
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

                {
                    comments.map((comment) => {
                        return (
                            <CommentView key={comment._id} comment={comment}/>
                        );
                    })
                }
            </div>
        );
    }
}

CommentList.propTypes = {
    postId: PropTypes.string.isRequired
}