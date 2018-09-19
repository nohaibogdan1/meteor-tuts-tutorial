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
        this.searchPosts(searchedText);
        this.setState({searchedText});
    }


    getSearchedPosts = () => {
        const filter = { title: {"$regex": `${this.state.searchedText}`}};
        console.log('getSearchedPosts filter', filter);
        listPostsQuery.clone(filter).fetch((err, posts) => {
            if (err) {
                return console.log(err);
            }
            console.log(posts);
        });
    }


    searchPosts =  _.debounce((searchedText) => { 
        console.log('debounce: ', searchedText);


        this.getSearchedPosts();

    }, 2000);
        

    render() {
        return (
            <div>
                <input type="text" value={this.state.searchedText} onChange={this.changeSearchedText}></input>
            </div>
        );
    }
}