import {Meteor} from 'meteor/meteor'
import registerUser from '/imports/api/users/registerUser';

Meteor.methods({
    'user.register' (data) {
        registerUser(data);
    }
});