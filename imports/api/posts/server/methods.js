import {Meteor} from 'meteor/meteor'
import {Posts} from '/imports/db';

Meteor.methods({
    'post.create'(post) {
        // Posts.insert(post);
    },

    'post.list' () {
        return Posts.find().fetch();
    },

    'post.edit' (_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                postType: post.postType
            }
        });
    },

    'post.remove' (_id){
        Posts.remove(_id);
    },

    'post.get' (_id) {
        return Posts.findOne(_id);
    },

    'post.views.increment' (_id) {
        Posts.update(_id, {
            $inc: {
                views: 1
            }
        });
    }
});