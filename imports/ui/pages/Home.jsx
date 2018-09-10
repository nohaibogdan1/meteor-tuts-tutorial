import React from 'react';
import {Meteor} from 'meteor/meteor';
import { AutoForm, AutoField } from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';


export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            number: -1
        }
    }
    render() {
        const {number} = this.state;
        return (
            <div className="home">
                Salut
            </div>
        )
    }
}

const schema = new SimpleSchema({
    myValue: String
});

