import React, { useState } from 'react';

function SearchForm({ onSubmit }) {
    const [ searchTerm, setSearchTerm ] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        setSearchTerm('')

        await onSubmit(searchTerm)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="searchTerm">Seu termo de busca</label>
                <input type="text" name="searchTerm" id="searchTerm" required value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <button type="submit">Buscar</button>
            </div>
        </form>
    )
}

export default SearchForm;