import {Comments} from '/db';

export default Comments.createQuery('listComments', {
    $filter({filters, params}) {
        filters.postId = params.postId;
    },

    posts: {
        userId: 1
    },

    text: 1,

    users: {
        emails: 1
    }
});