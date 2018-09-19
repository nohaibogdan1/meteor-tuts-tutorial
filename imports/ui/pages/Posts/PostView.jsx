import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

import CommentList from './../Comments/CommentList';

export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {
            post: null
        };
    }

    componentDidMount() {
        Meteor.call('secured.post_get', this.props.match.params._id, (err, post) => {
            this.setState(() => ({ post }));
        });
        Meteor.call('secured.views_increment', this.props.match.params._id, (err) => {
            if (err) {
                return alert(err.reason);
            }
        });
    }

    render() {
        const {post} = this.state;
        if (!post) {
            return <div>Loading....</div>
        }
        return (
            <div className="container">
                <h2>{post.title}</h2>
                <div>{post.description}</div>
                <p>{post.postType}</p>
                <p>{post.views} views</p>
                <CommentList postId={post._id}/>
            </div>
        )
    }
}

PostView.propTypes = {
    match: PropTypes.object.isRequired
}