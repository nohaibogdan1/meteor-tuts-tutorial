import {Posts} from '/imports/db';

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
    users: {
        emailAddress: 1
    },
    views: 1
});