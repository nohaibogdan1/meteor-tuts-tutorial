import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';

import '../securedMethods';

import {Comments} from '/db';
import {Posts} from '/db';

if (Meteor.isServer){
    describe('comments', function () {
        const commentOne = {
            _id: 'commentid1',
            text: 'ONE I like this post',
            userId: 'test_user_id_1',
            postId: 'postid1'
        };
        const commentTwo = {
            _id: 'commentid2',
            text: 'TWO I like this post',
            userId: 'test_user_id_2',
            postId: 'postid2'
        };
        const commentThree = {
            _id: 'commentid3',
            text: 'THREE I like this post',
            userId: 'test_user_id_3',
            postId: 'postid1'
        };
        const postOne = {
            _id: 'postid1',
            userId: 'post_user_id_1',
            title: 'This is about pictures',
            description: 'I like pictures a lot',
            postType: 'nature'
        };
        const postTwo = {
            _id: 'postid2',
            userId: 'post_user_id_2',
            title: 'This is about music',
            description: 'I like music a lot',
            postType: 'nature'
        };
    
        beforeEach(function() {
            Comments.remove({});
            Posts.remove({});
            Posts.insert(postOne);
            Posts.insert(postTwo);
            Comments.insert(commentOne);
            Comments.insert(commentTwo);
            Comments.insert(commentThree);
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
                .apply({userId: commentTwo.userId},[commentTwo])});
        });

        it('should give all comments that belong to a post', function () {
            let comments = Meteor.server.method_handlers['comment.list']
                .apply({},[postOne._id]);
            comments = comments.filter((value, index, array) => {
                return value.postId === postOne._id;
            });
            assert.strictEqual(comments.length, 2);
        });

        it('should remove a comment given the id if the authenticated user is the owner', function () {
            Meteor.server.method_handlers['comment.remove']
                .apply({userId: commentOne.userId}, [commentOne._id]);
            assert.strictEqual(Comments.findOne({_id: commentOne._id}), undefined);
        });

        it('should not remove a comment given the id if the authenticated user is not the owner',
            function () {
                Meteor.server.method_handlers['comment.remove']
                    .apply({userId: commentTwo.userId}, [commentOne._id]);
                assert.notStrictEqual(Comments.findOne({_id: commentOne._id}), undefined);
            }
        );

        it('should remove a comment given the id if the authenticated user is the owner of the post', 
            function () {
                Meteor.server.method_handlers['comment.remove']
                    .apply({userId: postOne.userId}, [commentThree._id]);
                assert.strictEqual(Comments.findOne({_id: commentThree._id}), undefined);                    
            }
        );

        it('should not remove a comment given the id if the authenticated user is not the owner of the post', 
            function () {
                Meteor.server.method_handlers['comment.remove']
                    .apply({userId: postOne.userId}, [commentTwo._id]);
                assert.notStrictEqual(Comments.findOne({_id: commentTwo._id}), undefined);                    
            }
        );

        

    




    });
}
