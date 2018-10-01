import React from 'react';
import {Meteor} from 'meteor/meteor';


export default ChatUser = (props) => {
    const {otherUserId, emailAddress} = props;
    onClickHandler = () => {
        props.sendUserId(otherUserId);
    }

    return (
        <div onClick={onClickHandler}>{emailAddress}</div>
    )
}