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
            lastDate: null
        }
    }

    setPosts = (posts, lastDate) => {
        this.setState({posts, lastDate});
    }

    navigateToCreatePage = () => {
        const {history} = this.props;
        history.push(RoutesEnum.POSTS_CREATE);
    }

    componentDidMount() {
        listPostsQuery.clone().fetch((err, posts) => {
            if (err) {
                return console.log(err);
            }
            this.setState({posts, loading: false, lastDate: posts[posts.length-1].createdAt});
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
                <button onClick={this.navigateToCreatePage}>Create a new post</button>
            </div>
        )
    }
}



