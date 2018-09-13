import React from 'react';
import {Tracker} from 'meteor/tracker';
import PropTypes from 'prop-types';

import listPostsQuery from '/imports/api/posts/queries/listPosts';
import PostElement from './PostElement';
import RoutesEnum from '/imports/ui/routes/enums/routes';

export default class PostListReactive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
        this.navigateToCreatePage = this.navigateToCreatePage.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
    }

    componentDidMount() {
        const query = listPostsQuery.clone({});
        const subscriptionHandle = query.subscribe();
        this.postsTracker = Tracker.autorun(() => {
            if (subscriptionHandle.ready()) {
                const posts = query.fetch();
                // this.setState({posts});
            }
        });
    }

    componentWillUnmount() {
        this.postsTracker.stop();
    }

    navigateToCreatePage() {
        const {history} = this.props;
        history.push(RoutesEnum.POSTS_CREATE);
    }

    renderPosts() {
        const {history} = this.props;
        return this.state.posts.map((post) => {
            return (
                <PostElement key={post._id} post={post} history={history}/>
            )
        })
    }

    render() {
        const {posts} = this.state;
        if (!posts) {
            return <div>Loading....</div>
        }
        return (
            <div className="post">
                {this.renderPosts()}
                <button onClick={this.navigateToCreatePage}>Create a new post</button>
            </div>
        )
    }
}

PostListReactive.propTypes = {
    history: PropTypes.object.isRequired
}