import {Meteor} from 'meteor/meteor';

import ReactionService from '../reactionService';

Meteor.methods({
    'secured.reaction_update' (reaction) {
        ReactionService.updateReaction(reaction);
    }
}); 
