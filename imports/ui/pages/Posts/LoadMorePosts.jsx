import React from 'react';

import listPostsQuery from '/imports/api/posts/queries/listPosts';

export default class LoadMorePosts extends React.Component {
    constructor(props) {
        super(props);
        const loadedPostsIds = props.posts.map((post) => {
            return post._id;
        });

        this.state = {
            loadedPostsIds
        }   
    }

    loadPosts = () => {
        const limit = 2;
        console.log('state.loadedPostsIds: ', this.state.loadedPostsIds);
        listPostsQuery.clone({_id: {"$nin": this.state.loadedPostsIds}, limit}).fetch((err, posts) => {
            if (err) {
                return console.log(err);
            }
            const loadedPostsIds = posts.map((post) => {
                return post._id;
            });
            this.setState((prevState) => ({
                loadedPostsIds: [...prevState.loadedPostsIds, ...loadedPostsIds]
            }));
            console.log('old posts: ', posts);
            this.props.getOldPosts(posts);
        });
    }

    render(){
        return (
            <button onClick={this.loadPosts}>Load old posts</button>   
        )
    }
}