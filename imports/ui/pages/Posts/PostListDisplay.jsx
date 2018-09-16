import React from 'react';
import PropTypes from 'prop-types';

import PostElement from './PostElement';

export default PostListDisplay = (props) => {
    const {posts, loading, history} = props;
    if (loading) {
        return <div>Loading...</div>
    }
    return ( 
        posts.map((post) => {
            return (
                <PostElement key={post._id} post={post} history={history}/>
            )
        })
    )
} 

PostListDisplay.propTypes = {
    history: PropTypes.object.isRequired
}