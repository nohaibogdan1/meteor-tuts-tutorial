import {Posts, Comments} from '/imports/db';

Meteor.users.addLinks({
    'posts': {
        collection: Posts,
        inversedBy: 'users'
    },
    'comments': {
        collection: Comments,
        inversedBy: 'users'
    }
});

Meteor.users.addReducers({
    emailAddress: {
        body: {
            emails: {
                address: 1
            }
        },
        reduce(object) {
            const {emails} = object;
            return `${emails[0].address}`;
        }
    }
})