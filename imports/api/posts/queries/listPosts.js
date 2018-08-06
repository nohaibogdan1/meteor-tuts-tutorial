import {Posts} from '/db';

export default Posts.createQuery('listPosts', {
    $filter({filters, params}) {
        if (params._id){
            filters._id = params._id;
        }
    },
    comments: {
        _id: 1
    },
    description: 1,
    title: 1,
    userId: 1,
    views: 1
});