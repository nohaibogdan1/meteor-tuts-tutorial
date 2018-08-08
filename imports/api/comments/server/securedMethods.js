import {Meteor} from 'meteor/meteor';
import CommentService from '/imports/api/comments/services';

Meteor.methods({
    'secured.comment_create' (comment) {
        return CommentService.createComment(comment);
    },

    'secured.comment_list' (postId) {        
        return CommentService.listComments(postId);
    },

    'secured.comment_remove' (_id) {
        CommentService.removeComment(_id);
    }

});