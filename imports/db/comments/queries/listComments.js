import {Comments} from '/imports/db';

export default Comments.createQuery('listComments', {
    $filter({filters, params}) {
        if (params.postId){
            filters.postId = params.postId;
        }
        if (params._id) {
            filters._id = params._id;
        }
    },

    posts: {
        userId: 1
    },

    text: 1,

    users: {
        emailAddress: 1
    }
});