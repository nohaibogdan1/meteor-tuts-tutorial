import {Meteor} from 'meteor/meteor'
import PostService from '/imports/api/posts/postService';

Meteor.methods({
    'secured.post_create'(post) {
        return PostService.createPost({...post, userId: this.userId});
    },

    'secured.post_list' () {
        return PostService.listPosts({userId: this.userId});
    },

    'secured.post_edit' ({_id, post}) {
        PostService.editPost({_id, userId: this.userId, post});
    },

    'secured.post_remove' (_id){
        PostService.removePost({_id, userId: this.userId});
    },

    'secured.post_get' (_id) {
        return PostService.getPost(_id);
    },

    'secured.views_increment' (_id) {
        PostService.incrementViews(_id);
    }
});