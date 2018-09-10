import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

import PostElement from './PostElement';

export default class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
        this.navigateToCreatePage = this.navigateToCreatePage.bind(this);
    }

    componentDidMount() {
        Meteor.call('secured.post_list', (err, posts) => {
            this.setState({posts});
        });
    }

    navigateToCreatePage() {
        const {history} = this.props;
        history.push('/posts/create');
    }

    render() {
        const {posts} = this.state;
        const {history} = this.props;
        if (!posts) {
            return <div>Loading....</div>
        }
        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (<PostElement key={post._id} post={post} history={history}/>)
                    })}
                <button onClick={this.navigateToCreatePage}>Create a new post</button>
            </div>
        )
    }
}

PostList.propTypes = {
    history: PropTypes.object.isRequired
}