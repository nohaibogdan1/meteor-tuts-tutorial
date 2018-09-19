import React from 'react';
import {Meteor} from 'meteor/meteor';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PropTypes from 'prop-types';

import FormSchema from './schema';
import RoutesEnum from '/imports/ui/routes/enums/routes';

export default class PostEdit extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToPosts = this.navigateToPosts.bind(this);
        this.state = {post: null};
    }

    componentDidMount() {
        Meteor.call('secured.post_get', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }

    submit = (post) => {
        Meteor.call('secured.post_edit', {_id: this.props.match.params._id, post}, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post modified!')
        });
    };

    navigateToPosts() {
        const {history} = this.props;
        history.push(RoutesEnum.POSTS_REACTIVE);
    }

    render() {
        const {post} = this.state;
        if (!post) {
            return <div>Loading....</div>
        }
        return (
            <div className="container" style={{marginTop: "20px"}}>
                <AutoForm onSubmit={this.submit} schema={FormSchema} model={post}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField name="postType" />
                    <AutoField name="isVisibleForEveryone"/>
                    <button className="btn btn-outline-primary" type='submit'>Edit post</button>
                    <button className="btn btn-outline-primary" onClick={this.navigateToPosts}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}

PostEdit.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
}