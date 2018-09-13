import {Meteor} from 'meteor/meteor';

import Security from '/imports/api/security';
import {Reactions} from '/imports/db';
import listReactionsQuery from '/imports/api/reactions/queries/listReactions';

export default class ReactionService {
    static updateReaction(reaction) {
        Security.checkLoggedIn(reaction.userId);
        if (!Meteor.call('secured.post_get', reaction.postId)) {
            throw new Meteor.Error('post does not exist');
        }
        Reactions.upsert({userId: reaction.userId, postId: reaction.postId}, { $set: {text: reaction.text}});
    };

    static listReactions(postId) {
        const reactions = listReactionsQuery.clone({postId}).fetch();
        return reactions;
    };

    static getReactionCurrentUser({postId, userId}) {
        return listReactionsQuery.clone({postId, userId}).fetchOne();
    };
}