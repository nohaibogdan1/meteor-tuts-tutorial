import React from 'react';
import PropTypes from 'prop-types';

import PostElement from './PostElement';

export default PostListDisplay = (props) => {
    const {posts, loading, history} = props;
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className="col">
            {posts.map((post) => {
                return (
                    <PostElement  key={post._id} post={post} history={history}/>
                )
            })}
    
        </div> 
        )
} 

PostListDisplay.propTypes = {
    history: PropTypes.object.isRequired
}