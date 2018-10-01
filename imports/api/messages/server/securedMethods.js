import {Meteor} from 'meteor/meteor';

import MessageService from '/imports/api/messages/messageService';

Meteor.methods({
    'secured.message_create' ({text, otherUserId}) {

        MessageService.createMessage({text, otherUserId, userId: this.userId});
    }
});