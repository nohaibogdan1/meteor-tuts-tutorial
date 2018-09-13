import SimplSchema from 'simpl-schema';
import _ from 'underscore';

import PostTypesEnum from './enums/types';

export default new SimplSchema({
    createdAt: {
        type: Date,
        defaultValue: new Date()
    },
    description: {
        type: String
    },
    postType: {
        type: String,
        allowedValues: _.values(PostTypesEnum),
        defaultValue: _.values(PostTypesEnum)[0]
    },
    userId: {
        type: String
    },
    views: {
        type: Number,
        defaultValue: 0
    },
    isVisibleForEveryone: {
        type: Boolean
    },
    title:  {
        type: String
    }
});