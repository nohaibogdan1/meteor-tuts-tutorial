import {Meteor} from 'meteor/meteor';
import {Comments, Posts} from '/db';
import Security from '/imports/api/security';
import './../posts/methods';

Meteor.methods({
    'comment.create' (comment) {
        Security.checkLoggedIn(this.userId);
        comment.userId = this.userId;
        if (!Meteor.call('post.get', comment.postId)) {
            throw new Meteor.Error('post does not exist');
        }
        return Comments.insert(comment);
    },

    'comment.list' (postId) {
        return Comments.find({postId}).fetch();
    },

    'comment.remove' (_id) {
        Security.checkLoggedIn(this.userId);
        Comments.remove({_id, userId: this.userId});
        const comment = Comments.findOne({_id});
        if (!comment) {
            return;
        }
        console.log('comment',comment);
        const post = Posts.findOne({_id: comment.postId});
        console.log('post', post);
        if (this.userId === post.userId) {
            Comments.remove({_id});
        }
    }
    

});