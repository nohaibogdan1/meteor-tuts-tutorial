import React from 'react';

import listPostsQuery from '/imports/api/posts/queries/listPosts';
import PostListDisplayContainer from './PostListDisplayContainer';
import RoutesEnum from '/imports/ui/routes/enums/routes';
import LoadMorePosts from './LoadMorePosts';
import CategoryButton from './CategoryButton';
import {types} from '/imports/db/posts/enums/types';
import SearchPosts from './SearchPosts';

export default class PostList extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            posts: [],
            lastDate: null,
            category: '',
            searchText: ''
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

    loadFirstPosts = () => {
        const {searchText} = this.state;
        let {category} = this.state;
        if (category === 'all') {
            category = '';
        }
        let filter = {limit: this.limit, postType: category,  title: {"$regex": `${searchText}`}};
        listPostsQuery.clone(filter).fetch((err, posts) => {
            if (err) {
                return console.log(err);
            }
            this.setState({loading: false});
            if (posts.length) {
                this.setState({
                    posts,                    
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
        this.setState({category, posts: [], loading: true});
    }

    changeSearchText = (searchText) => {
        this.setState({posts: [], loading: true, searchText});
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
        const {category ,loading , posts, lastDate, searchText} = this.state;
        if (loading) {
            this.loadFirstPosts();
            return <div>...loading</div>
        }
        return (
            <div className="container" style={{marginTop: "20px"}}>
                <SearchPosts changeSearchText={this.changeSearchText} searchText={searchText}/>
                <div className="nav nav-pills nav-fill btn-group" style={{marginTop: "20px"}}>{this.showCategoryButtons()}</div>
                <PostListDisplayContainer postType={category} lastDate={lastDate} posts={posts} 
                    history={this.props.history} setPosts={this.setPosts}
                    searchText={searchText}/>
                <LoadMorePosts postType={category} getOldPosts={this.getOldPosts} posts={posts} limit={this.limit} searchText={searchText}/>
                <button className="btn btn-outline-primary" style={{marginTop: '20px'}} onClick={this.navigateToCreatePage}>Create a new post</button>
            </div>
        )
    }
}



