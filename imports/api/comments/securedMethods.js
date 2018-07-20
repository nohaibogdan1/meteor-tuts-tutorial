import {Meteor} from 'meteor/meteor';
import {Comments, Posts} from '/db';
import Security from '/imports/api/security';
import './../posts/methods';

Meteor.methods({
    'secured.comment_create' (comment) {
        Security.checkLoggedIn(this.userId);
        comment.userId = this.userId;
        if (!Meteor.call('post.get', comment.postId)) {
            throw new Meteor.Error('post does not exist');
        }
        return Comments.insert(comment);
    },

    'secured.comment_list' (postId) {
        return Comments.find({postId}).fetch();
    },

    'secured.comment_remove' (_id) {
        Security.checkLoggedIn(this.userId);
        Comments.remove({_id, userId: this.userId});
        const comment = Comments.findOne({_id});
        if (!comment) {
            return;
        }
        const post = Posts.findOne({_id: comment.postId});
        if (this.userId === post.userId) {
            Comments.remove({_id});
        }
    },

    'secured.comment_remove_all_by_post' (postId) {
        Comments.remove({postId});
    },

    'secured.comment_count_by_post' (postId) {
        return Comments.find({postId}).count();
    }
    

});