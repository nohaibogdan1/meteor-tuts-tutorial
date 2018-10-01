import listMessagesQuery from '/imports/api/messages/queries/listMessages';

listMessagesQuery.expose({
    firewall(userId, params) {
        if(!userId) {
            throw new Meteor.Error('not-allowed');
        }
    }
});