import {assert} from 'chai';

import '../../server/securedMethods';
import {Posts} from '/imports/db';

import {PostService} from '../../services';

describe('posts', function () {
    const postOne = {
        _id: 'postid1',
        title: 'Title one',
        description: 'Description post one',
        userId: 'id_user_one'
    };
    const postTwo = {
        _id: 'postid2',
        title: 'Title one',
        description: 'Description post one',
        userId: 'id_user_one'
    };


    beforeEach(function () {
        Posts.remove({});
    });

    it('should create new post if user is authenticated', function () {
        const _id = PostService.createPost.apply({userId: postOne.userId}, 
            [{_id:postOne._id, title: postOne.title, description: postOne.description}]);
        assert.strictEqual(Posts.find({_id}).fetch().length, 1);
    });

    it('should not create a post if user is not authenticated', function () {
        assert.throws(() => {PostService.createPost.apply({}, 
            [{_id:postOne._id, title: postOne.title, description: postOne.description}])});
    });

    it('should give all posts', function () {
        PostService.createPost.apply({userId: postOne.userId}, 
            [{_id: postOne._id, title: postOne.title, description: postOne.description}]);
        PostService.createPost.apply({userId: postTwo.userId}, 
            [{_id: postTwo._id, title: postTwo.title, description: postTwo.description}]);
            
        const posts = PostService.listPosts.apply({});
        assert.strictEqual(posts.length, 2);
    });

    it('should edit a post if the authenticated user is the owner', function () {
        PostService.createPost.apply({userId: postOne.userId}, 
            [{_id: postOne._id, title: postOne.title, description: postOne.description}]);
        const title = 'Another post';
        const description = 'Description of another post';
        PostService.editPost.apply({userId: postOne.userId},[postOne._id, {title, description}]);

        const post = Posts.find({_id: postOne._id}).fetch()[0];
        assert.strictEqual(post.title, title);
        assert.strictEqual(post.description, description);
    });


    it('should not edit if the authenticated user is not the owner', function () {
        PostService.createPost.apply({userId: postOne.userId}, 
            [{_id: postOne._id, title: postOne.title, description: postOne.description}]);
        const anotherUser = 'userid2';
        const title = 'Another post';
        const description = 'Description of another post';
        PostService.editPost.apply({userId: anotherUser},[postOne._id, {title, description}]);

        const post = Posts.find({_id: postOne._id}).fetch()[0];
        assert.notStrictEqual(post.title, title);
        assert.notStrictEqual(post.description, description);
    });

    it('should remove a post if the authenticated user is the owner of the post', function () {
        PostService.createPost.apply({userId: postOne.userId}, 
            [{_id: postOne._id, title: postOne.title, description: postOne.description}]);
        
        PostService.removePost.apply({userId: postOne.userId}, [postOne._id]);
        const post = PostService.getPost.apply({}, [postOne._id]);
        assert.strictEqual(post, undefined);
    });

    it('should not remove a post if the authenticated user is not the owner', function () {
        PostService.createPost.apply({userId: postOne.userId}, 
            [{_id: postOne._id, title: postOne.title, description: postOne.description}]);
        const anotherUser = 'userid2';
        PostService.removePost.apply({userId: anotherUser}, [postOne._id]);
        const post = PostService.getPost.apply({}, [postOne._id]);
        assert.notStrictEqual(post, undefined);
    });

    it('should update number of views for a post', function () {
        PostService.createPost.apply({userId: postOne.userId}, 
            [{_id: postOne._id, title: postOne.title, description: postOne.description}]);

        PostService.incrementViews.apply({},[postOne._id]);
        const post = PostService.getPost.apply({}, [postOne._id]);
        assert.strictEqual(post.views, 1);
    });
});