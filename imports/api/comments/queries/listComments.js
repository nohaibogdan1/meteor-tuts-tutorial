import {Comments} from '/db';

export default Comments.createQuery('listComments', {
    $filter({filters, params}) {
        filters.postId = params.postId;
    },
    text: 1,
    userId: 1,
    postId: 1
});