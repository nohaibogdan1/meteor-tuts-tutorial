import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';

import '../securedMethods';

import {Comments} from '/db';
import {Posts} from '/db';

if (Meteor.isServer){
    describe('comments', function () {
        const commentOne = {
            text: 'ONE I like this post',
            userId: 'test_user_id_1',
            postId: 'postid1'
        };
        const commentTwo = {
            text: 'TWO I like this post',
            userId: 'test_user_id_2',
            postId: 'postid2'
        };
        const post = {
            _id: 'id_of_post',
            title: 'This is about pictures',
            description: 'I like pictures a lot',
            postType: 'nature'
        };
    
        beforeEach(function() {
            Comments.remove({});
            Posts.remove({});
            Posts.insert(post);
        });
        
        it('should create comment', function () {
            const _id = Meteor.server.method_handlers['comment.create'].apply({userId: commentOne.userId},
                [{text: commentOne.text, postId: commentOne.postId}]);
            assert.strictEqual(Comments.find({_id}).fetch().length, 1);
        });

        it('should not create comment if not authenticated', function () {
            assert.throws(() => {Meteor.server.method_handlers['comment.create'].apply({});});
        });

        it('should not create comment if text is not given', function () {
            assert.throws(() => {Meteor.server.method_handlers['comment.create']
                .apply({userId: commentOne.userId},[{postId: commentOne.postId}]);});
        });

        it('should not create comment if postId is not given', function () {
            assert.throws(() => {Meteor.server.method_handlers['comment.create']
                .apply({userId: commentOne.userId},[{text: commentOne.text}]);});
        });

        it('should not create comment if post with postId does not exist', function () {
            assert.throws(() => {Meteor.server.method_handlers['comment.create']
                .apply({userId: commentOne.userId},[commentOne])});
        });

    });
}
