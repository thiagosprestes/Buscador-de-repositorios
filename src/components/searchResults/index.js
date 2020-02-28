import React from 'react';
import moment from 'moment'

import './style.css';

function SearchResults({ item }) {
    return (
        <li>
            <strong>{item.full_name}</strong>
            <p className="description">{item.description}</p>
            <div className="repository-info">
                <div className="data">
                    <div className="stars">                    
                        {item.stargazers_count} stars
                    </div>
                    {item.language !== null && <p className="language">{item.language}</p>}
                    <p className="date">Updated {moment(new Date(item.pushed_at)).format('D MMMM YYYY')}</p>
                </div>
                <div className="action">
                    <a href={item.html_url} target="_blank" rel="noopener noreferrer">Ver no Github</a>
                </div>
            </div>
        </li>
    )
}

export default SearchResults;