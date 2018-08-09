import {Meteor} from 'meteor/meteor'
import {PostService} from '/imports/api/posts/services';


Meteor.methods({
    'secured.post_create'(post) {
        return PostService.createPost(post);
    },

    'secured.post_list' () {
        return PostService.listPosts();
    },

    'secured.post_edit' (_id, postData) {
        PostService.editPost(_id, postData);
    },

    'secured.post_remove' (_id){
        PostService.removePost(_id);
    },

    'secured.post_get' (_id) {
        return PostService.getPost(_id);
    },

    'secured.views_increment' (_id) {
        PostService.incrementViews(_id);
    }
});