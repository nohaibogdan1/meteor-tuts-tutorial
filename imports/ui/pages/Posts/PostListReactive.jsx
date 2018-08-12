import React from 'react';
import {Tracker} from 'meteor/tracker';
import PropTypes from 'prop-types';
import {listPostsQuery} from '/imports/db/queries';

import PostElement from './PostElement';

export default class PostListReactive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
        this.navigateToCreatePage = this.navigateToCreatePage.bind(this);

    }

    componentDidMount() {
        const query = listPostsQuery.clone({});
        const subscriptionHandle = query.subscribe();
        this.postsTracker = Tracker.autorun(() => {
            if (subscriptionHandle.ready()) {
                const posts = query.fetch();
                this.setState({posts});
            }
        });
    }

    componentWillUnmount() {
        this.postsTracker.stop();
    }

    navigateToCreatePage() {
        const {history} = this.props;
        history.push('/posts/create/reactive');
    }

    render() {
        const {posts} = this.state;
        const {history} = this.props;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <PostElement key={post._id} post={post} history={history}/>
                        )
                    })}
                <button onClick={this.navigateToCreatePage}>Create a new post</button>
            </div>
        )
    }
}


PostListReactive.propTypes = {
    history: PropTypes.object.isRequired
}