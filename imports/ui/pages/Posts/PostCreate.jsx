import React from 'react';
import {Meteor} from 'meteor/meteor';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PropTypes from 'prop-types';
import FormSchema from './schema';
import moment from 'moment';

export default class PostCreate extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToPosts = this.navigateToPosts.bind(this);
    }

    submit = (post) => {
        post.createdAt = moment().valueOf();
        Meteor.call('secured.post_create', post, (err) => {
            if (err) {
                return alert(err);
            }
            alert('Post added!')
        });
        
    };

    navigateToPosts() {
        const {history} = this.props;
        history.push('/posts');
    }

    render() {
        

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={FormSchema}>
                    <AutoField name="title" />
                    <LongTextField name="description" />
                    <SelectField name="postType"/>
                    <button type='submit'>Add post</button>
                    <button onClick={this.navigateToPosts}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}

PostCreate.propTypes = {
    history: PropTypes.object.isRequired
}