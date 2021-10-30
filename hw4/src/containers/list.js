import React, { useState } from 'react';
import Item from '../components/item.js'

export default function List( { items, handleDelete }) {
    const [showList, setShowList] = useState({visibility: 'hidden'});

    return (
        <ul className="todo-app__list" id="todo-list" style = { showList }>
            <Item items={ items } handleDelete={handleDelete}/>  
        </ul>
    );
}