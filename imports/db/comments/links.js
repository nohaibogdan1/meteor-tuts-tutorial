import {Comments, Posts} from '/imports/db';

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


