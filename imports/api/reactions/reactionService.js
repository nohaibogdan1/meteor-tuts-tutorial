import {Meteor} from 'meteor/meteor';

import Security from '/imports/api/security';
import {Reactions} from '/imports/db';

export default class ReactionService {
    static updateReaction(reaction) {
        Security.checkLoggedIn(reaction.userId);
        if (!Meteor.call('secured.post_get', reaction.postId)) {
            throw new Meteor.Error('post does not exist');
        }
        Reactions.upsert({userId: reaction.userId, postId: reaction.postId}, { $set: {text: reaction.text}});
    }
}