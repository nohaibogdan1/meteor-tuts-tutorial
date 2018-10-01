import {withTracker} from 'meteor/react-meteor-data';

import listMessagesQuery from '/imports/api/messages/queries/listMessages';
import MessageList from './MessageList';

export default MessageListContainer = withTracker((props) => { 
    const {otherUserId} = props;
    const query = listMessagesQuery.clone({otherUserId});
    const subscriptionHandle = query.subscribe();
    return {
        loading: !subscriptionHandle.ready(),
        messages: query.fetch()
    };
})(MessageList)
