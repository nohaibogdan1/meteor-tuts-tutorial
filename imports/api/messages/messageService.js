import {Meteor} from 'meteor/meteor';

import {Messages} from '/imports/db';
import listMessagesQuery from '/imports/api/messages/queries/listMessages';
import Security from '/imports/api/security';
import UserService from '/imports/api/users/userService';

export default class MessageService {
    static createMessage({text, otherUserId, userId}) {
        Security.checkLoggedIn(userId);
        console.log(UserService.getUser(otherUserId));
        if (UserService.getUser(otherUserId)) {
            return Messages.insert({text, otherUserId, userId});
        }
    }
}