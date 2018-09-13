import SimpleSchema from 'simpl-schema';

import {types} from '/imports/db/posts/enums/types';

export default new SimpleSchema({
    description: {
        type: String
    },
    postType: {
        type: String,
        allowedValues: types,
        defaultValue: types[0]
    },
    title: {
        type: String
    },
    isVisibleForEveryone: {
        type: Boolean,
        defaultValue: true
    }
});