import React from 'react';
import {Tracker} from 'meteor/tracker';
import {listPostsQuery} from '/imports/api/queries';

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: null
        };
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

    delete(_id) {
        Meteor.call('secured.post_remove', _id);
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
                            <div key={post._id}>
                                <p>Post title: {post.title}</p>
                                <p>Post Description: {post.description}</p>
                                <p>{(post.comments)?post.comments.length:'0'} comments, {post.views} views</p>
                                <button onClick={() => {history.push("/posts/view/" + post._id)}}>See post</button>
                                {(post.userId === Meteor.userId()) ? 
                                    (<div>
                                        <button onClick={() => {
                                                history.push("/posts/edit/" + post._id)}
                                            }> Edit post
                                        </button>
                                        <button onClick={() => {
                                                this.delete(post._id)}
                                            }>Delete post
                                        </button>
                                    </div>):undefined
                                }
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}
