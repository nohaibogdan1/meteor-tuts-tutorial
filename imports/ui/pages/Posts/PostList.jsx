import React from 'react';

import listPostsQuery from '/imports/api/posts/queries/listPosts';
import PostListDisplayContainer from './PostListDisplayContainer';
import RoutesEnum from '/imports/ui/routes/enums/routes';
import LoadMorePosts from './LoadMorePosts';
import CategoryButton from './CategoryButton';
import {types} from '/imports/db/posts/enums/types';

export default class PostList extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            posts: [],
            lastDate: null,
            category: null
        }
    }

    limit = 2;

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
        this.loadFirstPosts();
    }

    loadFirstPosts = (category) => {
        this.setState({category});
        let filter = {limit: this.limit, postType: category};
        if (!category || category === 'all'){
            filter = {limit: this.limit};
        }
        this.setState({posts: []});
        listPostsQuery.clone(filter).fetch((err, posts) => {
            if (err) {
                return console.log(err);
            }
            if (posts.length) {
                this.setState({
                    posts,
                    loading: false,
                    lastDate: posts[0].createdAt
                });
            }
        });
    }

    getOldPosts = (oldPosts) => {
        this.setState((prevState) => ({
            posts: [...prevState.posts, ...oldPosts]
        }));
    }

    changeCategory = (category) => {
        this.loadFirstPosts(category);
    }

    showCategoryButtons = () => {
        const categories = [...types, 'all'];
        return categories.map((category) => {
                return (
                    <CategoryButton key={category} category={category} changeCategory={this.changeCategory}/>
                )
        });
    }   

    render() {
        const {category ,loading , posts, lastDate} = this.state;
        if (loading) {
            return <div>...loading</div>
        }
        return (
            <div>
                {this.showCategoryButtons()}
                <PostListDisplayContainer postType={category} lastDate={lastDate} posts={posts} history={this.props.history} setPosts={this.setPosts}/>
                <LoadMorePosts postType={category} getOldPosts={this.getOldPosts} posts={posts} limit={this.limit}/>
                <button onClick={this.navigateToCreatePage}>Create a new post</button>
            </div>
        )
    }
}



