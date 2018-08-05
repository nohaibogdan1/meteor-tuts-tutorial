import {Posts, Comments} from '../index';

Meteor.users.addLinks({
    'posts': {
        collection: Posts,
        inversedBy: 'users'
    }
});

Meteor.users.addLinks({
    'comments': {
        collection: Comments,
        inversedBy: 'users'
    }
});
