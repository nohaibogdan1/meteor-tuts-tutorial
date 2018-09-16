import {withTracker} from 'meteor/react-meteor-data';

import listPostsQuery from '/imports/api/posts/queries/listPosts';
import PostListDisplay from './PostListDisplay';

export default PostListDisplayContainer = withTracker((props) => {
    let query = listPostsQuery.clone({createdAt:{"$gt":props.lastDate}});
    const subscriptionHandle = query.subscribe();
    let lastPosts = [];
    if (subscriptionHandle.ready()) {
        lastPosts = query.fetch();
        if (lastPosts.length){
            props.setPosts([...props.posts, ...lastPosts],lastPosts[lastPosts.length-1].createdAt);
        }
    }

    return {
        loading: !subscriptionHandle.ready(),
        history: props.history
    };
})(PostListDisplay)
