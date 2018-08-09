import {Meteor} from 'meteor/meteor'
import {registerUser} from '/imports/api/users/services';

Meteor.methods({
    'user.register' (data) {
        registerUser(data);
    }
});