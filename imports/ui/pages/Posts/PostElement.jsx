import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

import RoutesEnum from '/imports/ui/routes/enums/routes';
import generateRoutes from '/imports/ui/routes/methods';

export default class PostElement extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToViewPage = this.navigateToViewPage.bind(this);
        this.navigateToEditPage = this.navigateToEditPage.bind(this);
        this.delete = this.delete.bind(this);
    }

    navigateToViewPage() {
        const {post} = this.props;
        const {history} = this.props;
        history.push(generateRoutes(RoutesEnum.POSTS_VIEW, {_id: post._id}));
    }

    navigateToEditPage() {
        const {post} = this.props;
        const {history} = this.props;
        history.push(generateRoutes(RoutesEnum.POSTS_EDIT, {_id: post._id}));
    }

    delete() {
        const {post} = this.props;
        Meteor.call('secured.post_remove', post._id);
    }

    render() {
        const {post} = this.props;
        return(
            <div>
                <p>Post title: {post.title}</p>
                <p>Post Description: {post.description}</p>
                <p>#{post.postType}</p>
                <p>{(post.comments)?post.comments.length:'0'} comments, {post.views} views</p>
                <button onClick={this.navigateToViewPage}>See post</button>
                {(post.users && post.users._id === Meteor.userId()) ?
                    (<div>
                        <button onClick={this.navigateToEditPage}> Edit post</button>
                        <button onClick={this.delete}>Delete post</button>
                    </div>):undefined
                }
            </div>
        );
    }
}

PostElement.propTypes = {
    post: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}
