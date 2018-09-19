import React from 'react';

import listPostsQuery from '/imports/api/posts/queries/listPosts';

export default function LoadMorePosts(props) {
    loadPosts = () => {
        const {limit, posts, getOldPosts, searchText} = props;
        let {postType} = props;
        if (postType === 'all') {
            postType = '';
        }
        const postsIds = posts.map((post) => {
            return post._id;
        });
        listPostsQuery.clone({_id: {"$nin": postsIds}, limit, postType, title: {"$regex" : `${searchText}`}}).fetch((err, posts) => {
            if (err) {
                return console.log(err);
            }
            getOldPosts(posts);
        });
    }

    return (
        <button className="btn btn-outline-primary" style={{marginTop: '20px', marginRight:'10px'}} onClick={loadPosts}>Load old posts</button>   
    )
}