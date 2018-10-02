import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';

import FormSchema from './schema';

export default MessageBox = (props) => {
    const {otherUserId} = props;
    console.log('messagebox', props);
    submit = ({text}) => {
        Meteor.call('secured.message_create',{text, otherUserId}, (err) => {
            if (err) {
                return console.log(err);
            }
        });
    }
    return (
        <AutoForm onSubmit={submit} schema={FormSchema}>
            <AutoField name="text"/>
            <button className="btn btn-outline-primary" type='submit'>Send</button>
        </AutoForm>
    )
}