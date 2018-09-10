import {Posts, Comments } from '/imports/db';

Posts.addLinks({
    'comments': {
        collection: Comments,
        inversedBy: 'posts',
        autoremove: true
    },
    'users': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId'
    }
});
