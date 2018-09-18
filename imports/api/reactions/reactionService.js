import {Meteor} from 'meteor/meteor';

import Security from '/imports/api/security';
import {Reactions} from '/imports/db';
import listReactionsQuery from '/imports/api/reactions/queries/listReactions';
import PostService from '/imports/api/posts/postService';

export default class ReactionService {
    static updateReaction(reaction) {
        Security.checkLoggedIn(reaction.userId);
        if (!PostService.getPost(reaction.postId)) {
            throw new Meteor.Error('post does not exist');
        }
        Reactions.upsert({userId: reaction.userId, postId: reaction.postId}, { $set: {text: reaction.text}});
    };

    static listReactions(postId) {
        return listReactionsQuery.clone({postId}).fetch();
    };

    static getReactionCurrentUser({postId, userId}) {
        return listReactionsQuery.clone({postId, userId}).fetchOne();
    };
}