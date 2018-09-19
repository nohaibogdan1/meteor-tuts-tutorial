import React from 'react';

export default function CategoryButton(props) {
    const {category, changeCategory} = props;
    sendCategory = () => {
        changeCategory(category);
    }

    return (
        <div>
            <button onClick={sendCategory}>{category}</button>
        </div>
    )
}