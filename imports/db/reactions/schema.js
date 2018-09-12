import SimpleSchema from 'simpl-schema';
import _ from 'underscore';

import PostReactionsEnum from './reactions';

export default new SimpleSchema({
    postId: {
        type: String
    },
    text: {
        type: String,
        allowedValues: _.values(PostReactionsEnum)
    },
    userId: {
        type: String
    }
});