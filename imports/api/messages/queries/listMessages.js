import {Messages} from '/imports/db';

export default Messages.createQuery('listMessages', {
    $filter({filters, params}) {
        if (params.userId){
            filters.userId = params.userId;
        }
        if (params.otherUserId) {
            filters.otherUserId = params.otherUserId;
        }
    },
    text: 1
});