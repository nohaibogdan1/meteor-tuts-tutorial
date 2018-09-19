import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {AutoForm, AutoField, ErrorsField} from 'uniforms-unstyled';

import RegisterSchema from './registerSchema';
import RoutesEnum from '/imports/ui/routes/enums/routes';

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
                    this.props.history.push(RoutesEnum.POSTS_REACTIVE);
                });
            } else {
                return alert(err.reason)
            }
        });
    };

    render() {
        return (
            <div className="authentication container" style={{marginTop: "20px"}}>
                <AutoForm schema={RegisterSchema} onSubmit={this.onSubmit}>
                    <ErrorsField/>
                    <AutoField name="email" placeholder="Email"/>
                    <AutoField name="password" type="password" placeholder="Password *"/>
                    <AutoField name="confirm_password" type="password" placeholder="Confirm password"/>
                    <button className="btn btn-outline-primary" type="submit">Create account</button>
                </AutoForm>
            </div>
        )
    }
}

Register.propTypes = {
    history: PropTypes.object.isRequired
}