import React from 'react';
import {Meteor} from 'meteor/meteor';
import { AutoForm, AutoField } from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';

import RoutesEnum from '/imports/ui/routes/enums/routes';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            number: -1
        }
    }

    navigateToChat = () => {
        const {history} = this.props;
        history.push(RoutesEnum.CHAT);
    }

    render() {
        const {number} = this.state;
        return (
            <div className="home">
                Salut

                <button onClick={this.navigateToChat}>Chat</button>
            </div>   
        );
    }
};

const schema = new SimpleSchema({
    myValue: String
});