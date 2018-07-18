import {Meteor} from 'meteor/meteor';
import {Comments} from '/db';
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
    }
    
});