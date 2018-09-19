import React from 'react';
import _ from 'underscore';

import listPostsQuery from '/imports/api/posts/queries/listPosts';

export default class SearchPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedText: ''
        }
    }

    changeSearchedText = (e) => {
        const searchedText = e.target.value;
        this.searchPosts();
        this.setState({searchedText});
    }

    searchPosts =  _.debounce(() => { 
        this.props.changeSearchedText(this.state.searchedText);
    }, 2000);
        
    render() {
        return (
            <div>
                <input type="text" value={this.state.searchedText} onChange={this.changeSearchedText}></input>
            </div>
        );
    }
}