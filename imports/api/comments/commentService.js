import {Meteor} from 'meteor/meteor';

import {Comments} from '/imports/db';
import listCommentsQuery from '/imports/api/comments/queries/listComments';
import Security from '/imports/api/security';
import PostService from '/imports/api/posts/postService';

export default class CommentService {
    static createComment(comment) {
        Security.checkLoggedIn(comment.userId);
        if (!PostService.getPost(comment.postId)) {
            throw new Meteor.Error('post does not exist');
        }
        return Comments.insert(comment);
    }

    static removeComment({_id, userId}) {
        Security.checkLoggedIn(userId);
        Comments.remove({_id, userId});
        const comment = listCommentsQuery.clone({_id}).fetchOne();
        // if comment is not removed it means that the authenticated 
        // user is not the owner of the comment
        if (comment) {
            // check to see if the authenticated user is the owner of the post
            // that the comment belongs to
            // if it 's true the authenticated user can remove the comment
            const post = PostService.getPost(comment.postId);
            if (userId === post.userId) {
                Comments.remove({_id});
            }
        }
    }
}