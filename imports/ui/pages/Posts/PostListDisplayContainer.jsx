import {withTracker} from 'meteor/react-meteor-data';

import listPostsQuery from '/imports/api/posts/queries/listPosts';
import PostListDisplay from './PostListDisplay';

export default PostListDisplayContainer = withTracker((props) => {
    const {lastDate, postType, setPosts, history, searchedText} = props;
    let query = listPostsQuery.clone({createdAt:{"$gt":lastDate}, postType, title: {"$regex": `${searchedText}`}});
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
