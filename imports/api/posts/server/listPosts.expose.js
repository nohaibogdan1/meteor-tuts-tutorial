import listPostsQuery from '/imports/api/posts/queries/listPosts';

listPostsQuery.expose({
    firewall(userId, params) {
        if(!userId) {
            params.visibleForEveryone = true;
        }
    }
});