import {Meteor} from 'meteor/meteor';
import {Comments, Posts} from '/db';
import {listCommentsQuery, listPostsQuery} from './../queries';
import Security from '/imports/api/security';
import './../posts/methods';
import '/db/comments/links';
import '/db/posts/links';

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
        const comments = listCommentsQuery.clone({
            postId
        }).fetch();
        return comments;
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

    'secured.comment_count_by_post' (postId) {
        return listCommentsQuery.clone({
            postId
        }).getCount();
    }
    

});