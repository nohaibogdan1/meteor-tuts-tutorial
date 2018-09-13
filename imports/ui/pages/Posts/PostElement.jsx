import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';


import RoutesEnum from '/imports/ui/routes/enums/routes';
import generateRoutes from '/imports/ui/routes/methods';

import ReactionButton from './ReactionButton';
import {reactions} from '/imports/db/reactions/reactions.enum';


export default class PostElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reactionsNumber: null,
            reactionCurrentUser: null
        }
        this.navigateToViewPage = this.navigateToViewPage.bind(this);
        this.navigateToEditPage = this.navigateToEditPage.bind(this);
        this.delete = this.delete.bind(this);
        this.addReaction = this.addReaction.bind(this);
        this.renderReactionButtons = this.renderReactionButtons.bind(this);
    }

    componentDidMount(){
        Meteor.call('secured.reactions_list', this.props.post._id, (error, reactions) => {
            if (error) {
                return console.log(error);
            }
            this.setState({reactionsNumber: reactions.length});
        });

        Meteor.call('secured.reaction_get_current_user', this.props.post._id, (error, reaction) => {
            if (error) {
                return console.log(error);
            }
            if (typeof reaction === 'undefined') {
                return;
            }
            this.setState({reactionCurrentUser: reaction.text});
        });
    }

    navigateToViewPage() {
        const {post} = this.props;
        const {history} = this.props;
        history.push(generateRoutes(RoutesEnum.POSTS_VIEW, {_id: post._id}));
    }

    navigateToEditPage() {
        const {post} = this.props;
        const {history} = this.props;
        history.push(generateRoutes(RoutesEnum.POSTS_EDIT, {_id: post._id}));
    }

    delete() {
        const {post} = this.props;
        Meteor.call('secured.post_remove', post._id);
    }

    addReaction(text) {
        reaction = {
            postId: this.props.post._id, 
            text
        }
        Meteor.call('secured.reaction_update', reaction);
    }

    renderReactionButtons() {
        return reactions.map((reaction) => {
            return (
                <ReactionButton key={reaction} addReaction={this.addReaction} text={reaction}/>
            )
        });
    }

    render() {
        const {post} = this.props;
        return(
            <div>
                <p>Post title: {post.title}</p>
                <p>Post Description: {post.description}</p>
                <p>#{post.postType}</p>
                <p>{(post.comments)?post.comments.length:'0'} comments, {post.views} views</p>
                <button onClick={this.navigateToViewPage}>See post</button>
                {(post.users && post.users._id === Meteor.userId()) ?
                    (<div>
                        <button onClick={this.navigateToEditPage}> Edit post</button>
                        <button onClick={this.delete}>Delete post</button>
                    </div>):undefined
                }
                <p>{this.state.reactionCurrentUser}</p>
                <p>{this.state.reactionsNumber?`${this.state.reactionsNumber} reactions`:''}</p>
                {this.renderReactionButtons()}
            </div>
        );
    }
}

PostElement.propTypes = {
    post: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}