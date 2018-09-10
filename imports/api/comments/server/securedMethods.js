import {Meteor} from 'meteor/meteor';

import CommentService from '/imports/api/comments/commentService';

Meteor.methods({
    'secured.comment_create' (comment) {
        return CommentService.createComment(comment);
    },

    'secured.comment_remove' (_id) {
        CommentService.removeComment(_id);
    }

});