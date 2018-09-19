import React from 'react';

export default function CategoryButton(props) {
    const {category, changeCategory} = props;
    sendCategory = () => {
        changeCategory(category);
    }

    return (
            <button type="button" className="nav-item btn btn-outline-primary btn-lg" onClick={sendCategory}>{category}</button>
    )
}