import React from 'react';

import listPostsQuery from '/imports/api/posts/queries/listPosts';

export default function LoadMorePosts(props) {
    loadPosts = () => {
        const {limit, posts, getOldPosts, postType, searchText} = props;
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
        <div>
            <button onClick={loadPosts}>Load old posts</button>   
        </div>
    )
}