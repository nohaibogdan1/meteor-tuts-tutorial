import {Meteor} from 'meteor/meteor';
import {assert} from 'chai';

import {Comments} from '/db';

if (Meteor.isServer){
    describe('comments', function () {
        const commentOne = {
            text: 'ONE I like this post',
            userId: 'test_user_id_1',
            postId: 'postid1'
        };
    
        beforeEach(function() {
            Comments.remove({});
            Comments.insert(commentOne);
        });
        // alert('fegfg');
        
        it('should create comment', function () {
            const userId = 'testid';
            const bla = Meteor.server.method_handlers['comment.create'];
            console.log('bla', Meteor.server.method_handlers['post.create']);
            // alert('fdg');
        });
    });
}
