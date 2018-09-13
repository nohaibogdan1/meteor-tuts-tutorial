import {Meteor} from 'meteor/meteor';

import ReactionService from '../reactionService';

Meteor.methods({
    'secured.reaction_update' (reaction) {
        ReactionService.updateReaction(reaction);
    },

    'secured.reactions_list' (postId) {
        return ReactionService.listReactions(postId);
    },

    'secured.reaction_get_current_user' ({postId, userId}) {
        return ReactionService.getReactionCurrentUser({postId, userId});
    }
}); 