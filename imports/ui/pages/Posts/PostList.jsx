import React from 'react';

import listPostsQuery from '/imports/api/posts/queries/listPosts';
import PostListDisplayContainer from './PostListDisplayContainer';
import RoutesEnum from '/imports/ui/routes/enums/routes';

export default class PostList extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            posts: [],
            lastDate: null,
            page: 1, 
            numberOfLastPosts: 0
        }
    }

    setPosts = (lastPosts) => {
        this.setState((prevState) => ({
            posts: [...lastPosts, ...prevState.posts],
            lastDate: lastPosts[0].createdAt,
            numberOfLastPosts: lastPosts.length
        }));
    }

    navigateToCreatePage = () => {
        const {history} = this.props;
        history.push(RoutesEnum.POSTS_CREATE);
    }

    componentDidMount() {
        const limit = 10;
        listPostsQuery.clone({limit}).fetch((err, posts) => {
            if (err) {
                return console.log(err);
            }
            this.setState((prevState) => ({
                posts,
                loading: false,
                lastDate: posts[0].createdAt,
                page: prevState.page + 1
            }));
        });
    }

    loadPosts = () => {
        const limit = 10;
        const {page, numberOfLastPosts} = this.state;
        skip = (page - 1) * limit + numberOfLastPosts;
        listPostsQuery.clone({limit, skip}).fetch((err, posts) => {
            if (err) {
                return console.log(err);
            }
            this.setState((prevState) => ({
                posts: [...prevState.posts, ...posts],
                page: prevState.page + 1
            }));
        });
    }

    render() {
        const {loading, posts, lastDate} = this.state;
        if (loading) {
            return <div>...loading</div>
        }
        return (
            <div>
                <PostListDisplayContainer lastDate={lastDate} posts={posts} history={this.props.history} setPosts={this.setPosts}/>
                <button onClick={this.loadPosts}>Load more</button>
                <button onClick={this.navigateToCreatePage}>Create a new post</button>
            </div>
        )
    }
}



