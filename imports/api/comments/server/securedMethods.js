import {Meteor} from 'meteor/meteor';

import CommentService from '/imports/api/comments/commentService';

Meteor.methods({
    'secured.comment_create' (comment) {
        return CommentService.createComment({userId: this.userId, ...comment});
    },

    'secured.comment_remove' (_id) {
        CommentService.removeComment({_id, userId: this.userId});
    }
});