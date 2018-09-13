import {Meteor} from 'meteor/meteor';

import ReactionService from '../reactionService';

Meteor.methods({
    'secured.reaction_update' (reaction) {
        ReactionService.updateReaction({...reaction, userId: this.userId});
    },

    'secured.reactions_list' (postId) {
        return ReactionService.listReactions(postId);
    },

    'secured.reaction_get_current_user' (postId) {
        return ReactionService.getReactionCurrentUser({postId, userId: this.userId});
    }
}); 