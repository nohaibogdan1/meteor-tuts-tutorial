import listMessagesQuery from '/imports/api/messages/queries/listMessages';

listMessagesQuery.expose({
    firewall(userId, params) {
        if(!userId) {
            throw new Meteor.Error('not-allowed');
        } 
        if(params.otherUserId['$in'][1] === userId) {
            params.userId = params.otherUserId;
        } else {
            throw new Meteor.Error('not-allowed');
        }
    }
});