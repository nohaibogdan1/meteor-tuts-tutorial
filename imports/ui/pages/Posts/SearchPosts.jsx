import React from 'react';
import _ from 'underscore';

import listPostsQuery from '/imports/api/posts/queries/listPosts';

export default class SearchPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
    }

    changeSearchText = (e) => {
        const searchText = e.target.value;
        this.searchPosts();
        this.setState({searchText});
    }

    searchPosts =  _.debounce(() => { 
        this.props.changeSearchText(this.state.searchText);
    }, 2000);
        
    render() {
        return (
            <div>
                <input type="text" value={this.state.searchText} onChange={this.changeSearchText}></input>
            </div>
        );
    }
}