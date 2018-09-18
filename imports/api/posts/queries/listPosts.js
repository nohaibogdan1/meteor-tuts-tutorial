import {Posts} from '/imports/db';

export default Posts.createQuery('listPosts', {
    $filter({filters, params}) {
        if (params._id){
            filters._id = params._id;
        }
        if (params.isVisibleForEveryone){
            filters.isVisibleForEveryone = params.isVisibleForEveryone;
        }
        if (params.createdAt) {
            filters.createdAt = params.createdAt;
        }
        if (params.postType) {
            filters.postType = params.postType;
        }
    },
    $options: { sort: {createdAt: -1}},
    $paginate: true,
    comments: {
        _id: 1
    },
    description: 1,
    title: 1,
    postType: 1,
    userId: 1,
    users: {
        emailAddress: 1
    },
    views: 1,
    createdAt: 1
});