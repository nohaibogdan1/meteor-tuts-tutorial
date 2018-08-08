import { Meteor } from 'meteor/meteor';
import {assert} from 'chai';

import '../securedMethods';
import {Posts} from '/imports/db';

describe('posts', function () {
    const postOne = {
        _id: 'postid10',
        title: 'Title one',
        description: 'Description post one',
        userId: 'id_user_one'
    };


    beforeEach(function () {
        Posts.remove({});
        
    });

    it('should create new post if user is authenticated', function () {
        const _id = Meteor.server.method_handlers['secured.post_create'].apply({userId: postOne.userId}, 
            [{_id:postOne._id, title: postOne.title, description: postOne.description}]);
        assert.strictEqual(Posts.find({_id}).fetch().length, 1);
    });

    it('should not create a post if user is not authenticated', function () {
        assert.throws(() => {Meteor.server.method_handlers['secured.post_create'].apply({})});
    });

    it('should give all posts', function () {
        Meteor.server.method_handlers['secured.post_create'].apply({userId: postOne.userId}, 
            [{_id: postOne._id, title: postOne.title, description: postOne.description}]);
        const posts = Meteor.server.method_handlers['secured.post_list'].apply({});
        assert.strictEqual(posts.length, 1);
    });

    it('should edit a post if the authenticated user is the owner', function () {
        Meteor.server.method_handlers['secured.post_create'].apply({userId: postOne.userId}, 
            [{_id: postOne._id, title: postOne.title, description: postOne.description}]);
        const title = 'Another post';
        const description = 'Description of another post';
        Meteor.server.method_handlers['secured.post_edit'].apply({userId: postOne.userId}, 
            [postOne._id, {title, description}]);

        const post = Posts.find({_id: postOne._id}).fetch()[0];
        assert.strictEqual(post.title, title);
        assert.strictEqual(post.description, description);
    });


    it('should not edit if the authenticated user is not the owner', function () {
        Meteor.server.method_handlers['secured.post_create'].apply({userId: postOne.userId}, 
            [{_id: postOne._id, title: postOne.title, description: postOne.description}]);
        const anotherUser = 'userid2';
        Meteor.server.method_handlers['secured.post_edit'].
            apply({userId: anotherUser}, [postOne._id, {title: 'title', description: 'description'}]);
        const post = Meteor.server.method_handlers['secured.post_get'].
            apply({}, [postOne._id]);
        assert.notStrictEqual(post.title, 'title');
        assert.notStrictEqual(post.description, 'description');
    });

    it('should remove a post if the authenticated user is the owner of the post', function () {
        Meteor.server.method_handlers['secured.post_create'].apply({userId: postOne.userId}, 
            [{_id: postOne._id, title: postOne.title, description: postOne.description}]);
        
        Meteor.server.method_handlers['secured.post_remove'].
            apply({userId: postOne.userId}, [postOne._id]);
        const post = Meteor.server.method_handlers['secured.post_get'].
            apply({}, [postOne._id]);
        assert.strictEqual(post, undefined);
    });

    it('should not remove a post if the authenticated user is not the owner', function () {
        Meteor.server.method_handlers['secured.post_create'].apply({userId: postOne.userId}, 
            [{_id: postOne._id, title: postOne.title, description: postOne.description}]);
        const anotherUser = 'userid2';
        Meteor.server.method_handlers['secured.post_remove'].
            apply({userId: anotherUser}, [postOne._id]);
        const post = Meteor.server.method_handlers['secured.post_get'].
            apply({}, [postOne._id]);
        assert.notStrictEqual(post, undefined);
    });

    
});