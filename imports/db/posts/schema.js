import SimplSchema from 'simpl-schema';

import {types, PostTypesEnum} from './enums/types';

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
        allowedValues: types,
        defaultValue: PostTypesEnum.NATURE
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