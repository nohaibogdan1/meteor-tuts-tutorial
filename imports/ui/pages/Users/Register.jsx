import React, {Component} from 'react';
import {AutoForm, AutoField, ErrorsField} from 'uniforms-unstyled';
import RegisterSchema from './registerSchema';

export default class Register extends Component {
    constructor() {
        super();
    }

    onSubmit = (data) => {
        Meteor.call('user.register', data, (err) => {
            if (!err) {
                Meteor.loginWithPassword(data.email, data.password, (err) => {
                    if (err) {
                        return alert(err.reason);
                    }
                    this.props.history.push('/posts');
                });
            } else {
                return alert(err.reason)
            }
        });
    };


    render() {
        return (
            <div className="authentication">
                <AutoForm schema={RegisterSchema} onSubmit={this.onSubmit}>
                    <ErrorsField/>
                    <AutoField name="email" placeholder="Email"/>
                    <AutoField name="password" type="password" placeholder="Password *"/>
                    <AutoField name="confirm_password" type="password" placeholder="Confirm password"/>
                    <button type="submit">Create account</button>
                </AutoForm>
            </div>
        )
    }
}
