import React, { useState } from 'react';
import './App.css';
import './global.css';

import api from './services/api';

import SearchForm from './components/searchForm';
import SearchResults from './components/searchResults';

function App() {
  const [ results, setResults ] = useState([])
  const [ totalItems, setTotalItems] = useState('')
  const [ sort, setSort ] = useState('')
  const [ notFound, setNotFound] = useState('')

  async function handleSubmitSearch(data) {
    api.get(`${data}&per_page=4&order=desc&sort=${sort}`)
    .then(response => {
      setResults(response.data.items)
      setTotalItems(response.data.total_count)
      
      if(response.data.items == 0) {
        setNotFound('Nenhum repositório foi encontrado com este termo de busca')
      }
    });
  }

  return (
    <div id="app">
      <SearchForm onSubmit={handleSubmitSearch} />

      {notFound !== '' && results == 0 && (
        <h4 style={{marginTop: '20px'}}>{notFound}</h4>
      )}

      {results  && (
        <div className="input-block">
          <div className="header">
            <strong>{totalItems} repositórios encontrados</strong>
            <div className="sort-options">
              <label>Filtrar:</label>
              <select name="sort" id="sort" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="undefined">Melhores resultados</option>
                <option value="stars">Mais estrelas</option>
              </select>
            </div>
          </div>
          <ul>
            {results.map(data => (
              <SearchResults key={data.id} item={data} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
