import React from 'react';
import {AutoForm, LongTextField, HiddenField} from 'uniforms-unstyled';

import FormSchema from './schema';

export default class CommentList extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: []
        };
    };


    submit = (comment) => {
        comment.postId = this.props.postId;
        Meteor.call('secured.comment_create', comment, (err) => {
            if (err) {
                return alert(err);
            }
            alert('comment added');
        });
    };

    componentDidMount() {
        comments = Meteor.call('secured.comment_list', this.props.postId, (err, comments) => {
            this.setState({comments});
        });
    };
    
    listComments() {
        return(
            <ul>
                {this.state.comments.map((comment) => {
                    return comment.text;
                })}
            </ul>
        );
    };

    render() {
        const {postId} = this.props;

        return (
            <div>
                <AutoForm onSubmit={this.submit} schema={FormSchema}>
                    <LongTextField name="text"/>
                    <button type="submit">Add</button>
                </AutoForm>

                <h1>Component list</h1>
                {this.listComments()}
            </div>
        );
    };
}