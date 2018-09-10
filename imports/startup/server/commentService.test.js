import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';

import {CommentService} from '../../services';
import {Comments, Posts} from '/imports/db';




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
        });
        
        it('should create comment', function () {
            Posts.insert(postOne);
            const _id = CommentService.createComment.apply({userId: commentOne.userId},
                [{text: commentOne.text, postId: commentOne.postId}]);
            assert.strictEqual(Comments.find({_id}).fetch().length, 1);
        });

        it('should not create comment if not authenticated', function () {
            assert.throws(() => {CommentService.createComment
                .apply({},[{text: commentOne.text, postId: commentOne.postId}]);});
        });

        it('should not create comment if text is not given', function () {
            assert.throws(() => {CommentService.createComment
                .apply({userId: commentOne.userId},[{postId: commentOne.postId}]);});
        });

        it('should not create comment if post with postId does not exist', function () {
            assert.throws(() => {CommentService.createComment
                .apply({userId: commentOne.userId},
                [{text: commentOne.text, postId: commentOne.postId}])});
        });

        it('should remove a comment given the id if the authenticated user is the owner', function () {
            Posts.insert(postOne);
            Comments.insert(commentOne);
            CommentService.removeComment.apply({userId: commentOne.userId}, [commentOne._id]);
            assert.strictEqual(Comments.findOne({_id: commentOne._id}), undefined);
        });

        it('should not remove a comment given the id if the authenticated user is not the owner',
            function () {
                Posts.insert(postOne);
                Comments.insert(commentOne);
                CommentService.removeComment.apply({userId: commentTwo.userId}, [commentOne._id]);
                assert.notStrictEqual(Comments.findOne({_id: commentOne._id}), undefined);
            }
        );

        it('should remove a comment given the id if the authenticated user is the owner of the post', 
            function () {
                Posts.insert(postOne);
                Comments.insert(commentThree);
                CommentService.removeComment.apply({userId: postOne.userId}, [commentThree._id]);
                assert.strictEqual(Comments.findOne({_id: commentThree._id}), undefined);                    
            }
        );

        it('should not remove a comment given the id if the authenticated user is not the owner of the post', 
            function () {
                Posts.insert(postTwo);
                Comments.insert(commentTwo);
                CommentService.removeComment.apply({userId: postOne.userId}, [commentTwo._id]);
                assert.notStrictEqual(Comments.findOne({_id: commentTwo._id}), undefined);                    
            }
        );

        it('should remove all comments of a post if that post is deleted', function () {
            Posts.insert(postOne);
            Comments.insert(commentOne);
            Comments.insert(commentThree);
            Posts.remove({_id: postOne._id});
            let comments = Comments.find({postId: postOne._id});
            assert.strictEqual(comments.length, undefined);
        });

    });
}
