import React from 'react';
import './style.css';

function SearchResults({ item }) {
    return (
        <li>
            <strong>{item.full_name}</strong>
            <p>{item.description}</p>
        </li>
    )
}

export default SearchResults;