import SimpleSchema from 'simpl-schema';

import {reactions} from './reactions.enum';

export default new SimpleSchema({
    postId: {
        type: String
    },
    text: {
        type: String,
        allowedValues: reactions
    },
    userId: {
        type: String
    }
});