import _ from 'underscore';

const PostTypesEnum = {
    NATURE: 'nature',
    PSYCHOLOGY: 'psychology',
    MUSIC: 'music',
    PROGRAMMING: 'programming',
    PROJECT_MANAGEMENT: 'project management',
    OTHERS: 'others'
};
const types = _.values(PostTypesEnum);

export {types};