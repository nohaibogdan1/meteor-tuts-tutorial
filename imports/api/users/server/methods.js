import {Meteor} from 'meteor/meteor'
import UserService from '/imports/api/users/userService';

Meteor.methods({
    'user.register' (data) {
        UserService.registerUser(data);
    },

    'user.list' () {
        return UserService.listUsers(this.userId);
    }
});