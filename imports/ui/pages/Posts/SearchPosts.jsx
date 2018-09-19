import React from 'react';

export default class SearchPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedText: ''
        }
    }


    changeSearchedText = (e) => {
        console.log(e.target.value);
        this.setState({searchedText: e.target.value});
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.searchedText} onChange={this.changeSearchedText}></input>
            </div>
        );
    }
}