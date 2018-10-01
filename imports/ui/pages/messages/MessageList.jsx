import React from 'react';


export default MessageList = (props) => {
    const {messages, loading} = props;
    if (loading) {
        return <div>Loading ...</div>
    }
    return (
        <div>
            {
                messages.map((message) => {
                    return <div key={message._id}>{message.text}</div>
                })
            }
        </div>
    );
}