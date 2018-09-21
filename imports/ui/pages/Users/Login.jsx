import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {AutoForm, AutoField, ErrorsField} from 'uniforms-unstyled';

import LoginSchema from './loginSchema';
import RoutesEnum from '/imports/ui/routes/enums/routes';

export default class Login extends React.Component {
    constructor() {
        super();
    }

    handleLogin = (data) => {
        const {email, password} = data;
        Meteor.loginWithPassword(email, password, (err) => {
            if (!err) {
                return this.props.history.push(RoutesEnum.POSTS_REACTIVE);
            }
            alert(err.reason);
        });
    };

    facebookLogin = () => {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, (err) => {
            if (err) {
                return alert('You can log in with facebook now');
            }
            this.props.history.push(RoutesEnum.POSTS_REACTIVE);
        });
    }

    render() {
        return (
            <div className="authentication container" style={{marginTop: "20px"}}>
                <AutoForm onSubmit={this.handleLogin} schema={LoginSchema}>
                    <ErrorsField/>
                    <AutoField name="email"
                        placeholder="Email"/>
                    <AutoField name="password" type="password" placeholder="Password"/>
                    <button className="btn btn-outline-primary" type="submit">Login</button>
                </AutoForm>

                <button onClick={this.facebookLogin}>Login with Facebook</button>
            </div>
        )
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired
}