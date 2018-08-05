
import {Posts, Comments } from '../index';

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