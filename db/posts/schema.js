import SimplSchema from 'simpl-schema';
import PostTypesEnum from './enums/types';
import _ from 'underscore';

export default new SimplSchema({
    createdAt: {
        type: Date,
        defaultValue: new Date()
    },
    description: {
        optional: true, //temporar
        type: String
    },
    postType: {
        type: String,
        allowedValues: _.values(PostTypesEnum),
        defaultValue: _.values(PostTypesEnum)[0]
    },
    userId: {
        type: String,
        optional: true
    },
    views: {
        type: Number,
        defaultValue: 0
    },
    title:  {
        type: String,
        optional: true//temprar
    }
});