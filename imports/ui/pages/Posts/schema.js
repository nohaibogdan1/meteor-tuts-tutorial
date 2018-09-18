import SimpleSchema from 'simpl-schema';

import {types, PostTypesEnum } from '/imports/db/posts/enums/types';

export default new SimpleSchema({
    description: {
        type: String
    },
    postType: {
        type: String,
        allowedValues: types,
        defaultValue: PostTypesEnum.NATURE
    },
    title: {
        type: String
    },
    isVisibleForEveryone: {
        type: Boolean,
        defaultValue: true
    }
});