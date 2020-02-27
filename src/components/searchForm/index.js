import React, { useState, useEffect } from 'react';

function SearchForm({ onSubmit }) {
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ sort, setSort ] = useState('')
    const [ order, setOrder ] = useState('desc')

    async function handleSubmit() {
        await onSubmit({searchTerm, sort, order})
    }

    useEffect(() => {
        handleSubmit()
    }, [sort, order])

    return (
        <div className="input-block">
            <label htmlFor="searchTerm">Seu termo de busca</label>
            <div className="input-group">
                <input type="text" name="searchTerm" id="searchTerm" onKeyUp={handleSubmit} onChange={e => setSearchTerm(e.target.value)} />
                <select name="sort" id="sort" defaultValue="filtrar" onChange={e => setSort(e.target.value)}>
                    <option value="filtrar" disabled>Filtrar por</option>
                    <option value="">Melhores resultados</option>
                    <option value="stars">Estrelas</option>
                    <option value="forks">Forks</option>
                    <option value="updated">Atualização</option>
                </select>
                {sort != '' && <select name="order" id="order" defaultValue="ordenar" onChange={e => setOrder(e.target.value)}>
                    <option value="ordenar" disabled>Ordernar</option>
                    {sort != 'updated' && (
                        <>
                            <option value="desc">Do maior para o menor</option>
                            <option value="asc">Do menor para o maior</option>
                        </>
                    )}
                    {sort == 'updated' && (
                        <>
                            <option value="desc">Do mais recente</option>
                            <option value="asc">Do mais antigo</option>
                        </>
                    )}
                </select>}
            </div>
        </div>
    )
}

export default SearchForm;