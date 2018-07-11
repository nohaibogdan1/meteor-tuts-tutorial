import SimplSchema from 'simpl-schema';
import PostTypesEnum from './enums/types';
import _ from 'underscore';

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    },
    views: {
        type: Number,
        defaultValue: 0
    },
    createdAt: {
        type: Date,
        defaultValue: new Date()
    },
    postType: {
        type: String,
        allowedValues: _.values(PostTypesEnum),
        defaultValue: _.values(PostTypesEnum)[0]
    }
});