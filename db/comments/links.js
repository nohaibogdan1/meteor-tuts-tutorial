import {Comments, Posts} from '../index';

Comments.addLinks({
    'posts': {
        type: 'one',
        collection: Posts,
        field: 'postId',
        index: true
    },

    'users': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
        index: true
    }
});
