import React, { useState } from 'react';

function SearchForm({ onSubmit }) {
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ sort, setSort ] = useState('')

    async function handleSubmit() {
        await onSubmit({searchTerm, sort})
    }

    return (
        <div className="input-block">
            <label htmlFor="searchTerm">Seu termo de busca</label>
            <div className="input-group">
                <input type="text" name="searchTerm" id="searchTerm" onKeyUp={handleSubmit} onChange={e => setSearchTerm(e.target.value)} />
                <select name="sort" id="sort" onChange={e => setSort(e.target.value)}>
                    <option disabled selected>Ordenação</option>
                    <option value="">Melhor resultado</option>
                    <option value="stars">Mais estrelas</option>
                </select>
            </div>
        </div>
    )
}

export default SearchForm;