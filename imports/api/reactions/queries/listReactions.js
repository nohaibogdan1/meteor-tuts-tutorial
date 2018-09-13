import {Reactions} from '/imports/db';

export default Reactions.createQuery('listReactions', {
    $filter({filters, params}) {
        if (params.postId) {
            filters.postId = params.postId;
        }
        if (params.userId) {
            filters.userId = params.userId;
        }
    },
    text: 1
});