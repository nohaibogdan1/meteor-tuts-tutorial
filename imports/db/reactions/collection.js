import {Mongo} from 'meteor/mongo';

import ReactionSchema from './schema';

const Reactions = new Mongo.Collection('reactions');
Reactions.attachSchema(ReactionSchema);
export default Reactions;