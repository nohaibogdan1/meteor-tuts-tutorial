import {withTracker} from 'meteor/react-meteor-data';

import listPostsQuery from '/imports/api/posts/queries/listPosts';
import PostListDisplay from './PostListDisplay';

export default PostListDisplayContainer = withTracker((props) => {
    const {lastDate, setPosts, history, searchText} = props;
    let {postType} = props;
    if (postType === 'all') {
        postType = '';
    }
    let query = listPostsQuery.clone({createdAt:{"$gt":lastDate}, postType, title: {"$regex": `${searchText}`}});
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
