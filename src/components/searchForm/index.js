import React, { useState } from 'react';

function SearchForm({ onSubmit }) {
    const [ searchTerm, setSearchTerm ] = useState('')

    async function handleSubmit() {
        await onSubmit(searchTerm)
    }

    return (
        <div className="input-block">
            <label htmlFor="searchTerm">Seu termo de busca</label>
            <div className="input-group">
                <input type="text" name="searchTerm" id="searchTerm" onKeyUp={handleSubmit} onChange={e => setSearchTerm(e.target.value)} />
            </div>
        </div>
    )
}

export default SearchForm;