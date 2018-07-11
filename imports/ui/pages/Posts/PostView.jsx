import React from 'react';


export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {
            post: null
        };
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState(() => ({ post }));
        });

        Meteor.call('post.views.increment', this.props.match.params._id, (err) => {
            if (err) {
                return alert(err.reason);
            }
        });
    }

    render() {
        const {post} = this.state;
        if (!post) {
            return <div>Loading....</div>
        }
        
        return (
            <div>
                <h2>{post.title}</h2>
                <div>{post.description}</div>
                <p>{post.postType}</p>
            </div>
        )
    }
}