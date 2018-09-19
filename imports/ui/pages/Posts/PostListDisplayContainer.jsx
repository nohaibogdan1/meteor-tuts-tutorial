import {withTracker} from 'meteor/react-meteor-data';

import listPostsQuery from '/imports/api/posts/queries/listPosts';
import PostListDisplay from './PostListDisplay';

export default PostListDisplayContainer = withTracker((props) => {
    const {lastDate, postType, setPosts, history} = props;
    let query = listPostsQuery.clone({createdAt:{"$gt":lastDate}, postType});
    const subscriptionHandle = query.subscribe();
    let lastPosts = [];
    if (subscriptionHandle.ready()) {
        lastPosts = query.fetch();
        if (lastPosts.length){
            setPosts(lastPosts);
        }
    }

    return {
        loading: !subscriptionHandle.ready(),
        history
    };
})(PostListDisplay)
