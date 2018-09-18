import React from 'react';

import listPostsQuery from '/imports/api/posts/queries/listPosts';

export default class LoadMorePosts extends React.Component {
    constructor(props) {
        super(props);
    }

    loadPosts = () => {
        const {limit, posts} = this.props;
        const postsIds = posts.map((post) => {
            return post._id;
        });
        listPostsQuery.clone({_id: {"$nin": postsIds}, limit}).fetch((err, posts) => {
            if (err) {
                return console.log(err);
            }
            this.props.getOldPosts(posts);
        });
    }

    render(){
        return (
            <div>
                <button onClick={this.loadPosts}>Load old posts</button>   
            </div>
        )
    }
}