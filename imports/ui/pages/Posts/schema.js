import SimpleSchema from 'simpl-schema';
import PostTypesEnum from './enums/types';

export default new SimpleSchema({
    description: {
        type: String
    },
    postType: {
        type: String,
        allowedValues: _.values(PostTypesEnum),
        defaultValue: _.values(PostTypesEnum)[0]
    },
    title: {
        type: String
    },
    visibleForEveryone: {
        type: Boolean
    }
});