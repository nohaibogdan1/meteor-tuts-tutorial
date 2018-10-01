import {Mongo} from 'meteor/mongo';

import MessageSchema from './schema';

const Messages = new Mongo.Collection('messages');
Messages.attachSchema(MessageSchema);
export default Messages;