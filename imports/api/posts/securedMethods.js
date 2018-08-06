import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';
import Security from '/imports/api/security';
import {listPostsQuery} from '../queries';

Meteor.methods({
    'secured.post_create'(post) {
        Security.checkLoggedIn(this.userId);
        post.userId = this.userId;
        return Posts.insert(post);
    },

    'secured.post_list' () {
        const posts = listPostsQuery.clone({}).fetch();
        return posts;
    },

    'secured.post_edit' (_id, postData) {
        Posts.update({_id: _id, userId: this.userId}, {
            $set: {
                title: postData.title,
                description: postData.description
            }
        });
    },

    'secured.post_remove' (_id){
        Posts.remove({_id: _id, userId: this.userId});
    },

    'secured.post_get' (_id) {
        return listPostsQuery.clone({_id}).fetchOne();
    }
});