import {Meteor} from 'meteor/meteor';

import {Comments, Posts} from '/imports/db';
import listPostsQuery from '/imports/api/posts/queries/listPosts';
import listCommentsQuery from '/imports/api/comments/queries/listComments';
import Security from '/imports/api/security';

export default class CommentService {
    static createComment(comment) {
        Security.checkLoggedIn(Meteor.userId());
        comment.userId = Meteor.userId();
        
        if (!Meteor.call('secured.post_get', comment.postId)) {
            throw new Meteor.Error('post does not exist');
        }

        return Comments.insert(comment);
    }

    static removeComment(_id) {
        Security.checkLoggedIn(Meteor.userId());
        Comments.remove({_id, userId: Meteor.userId()});

        const comment = listCommentsQuery.clone({_id}).fetchOne();
        // if comment is not removed it means that the authenticated 
        // user is not the owner of the comment
        if (comment) {
            // check to see if the authenticated user is the owner of the post
            // that the comment belongs to
            // if it 's true the authenticated user can remove the comment
            const post = listPostsQuery.clone({_id: comment.postId}).fetchOne();
            if (Meteor.userId() === post.userId) {
                Comments.remove({_id});
            }
        }
    }
}