import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

export default class ReactionButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleReaction = this.handleReaction.bind(this);
    }

    handleReaction() {
        this.props.addReaction(this.props.text);
    }

    render() {
        return (
            <div>
                <button onClick={this.handleReaction}>{this.props.text}</button>
            </div>
        );
    }
}

ReactionButton.propTypes = {
    text: PropTypes.string.isRequired,
    addReaction: PropTypes.func.isRequired
}
