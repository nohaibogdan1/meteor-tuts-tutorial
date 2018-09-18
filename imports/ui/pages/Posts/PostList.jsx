import React from 'react';

import listPostsQuery from '/imports/api/posts/queries/listPosts';
import PostListDisplayContainer from './PostListDisplayContainer';
import RoutesEnum from '/imports/ui/routes/enums/routes';
import LoadMorePosts from './LoadMorePosts';

export default class PostList extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            posts: [],
            lastDate: null
        }
    }

    setPosts = (lastPosts) => {
        this.setState((prevState) => ({
            posts: [...lastPosts, ...prevState.posts],
            lastDate: lastPosts[0].createdAt
        }));
    }

    navigateToCreatePage = () => {
        const {history} = this.props;
        history.push(RoutesEnum.POSTS_CREATE);
    }

    componentDidMount() {
        const limit = 2;
        listPostsQuery.clone({limit}).fetch((err, posts) => {
            if (err) {
                return console.log(err);
            }
            this.setState({
                posts,
                loading: false,
                lastDate: posts[0].createdAt
            });
        });
    }

    getOldPosts = (oldPosts) => {
        this.setState((prevState) => ({
            posts: [...prevState.posts, ...oldPosts]
        }));

    }

    render() {
        const {loading, posts, lastDate} = this.state;
        if (loading) {
            return <div>...loading</div>
        }
        return (
            <div>
                <PostListDisplayContainer lastDate={lastDate} posts={posts} history={this.props.history} setPosts={this.setPosts}/>
                <LoadMorePosts getOldPosts={this.getOldPosts} posts={posts} limit={2}/>
                <button onClick={this.navigateToCreatePage}>Create a new post</button>
            </div>
        )
    }
}



