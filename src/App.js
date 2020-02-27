import React, { useState } from 'react';
import './App.css';
import './global.css';

import api from './services/api';

import SearchForm from './components/searchForm';
import SearchResults from './components/searchResults';

function App() {
  const [ results, setResults ] = useState([])
  const [ totalItems, setTotalItems] = useState('')

  const [ notFound, setNotFound] = useState('')

  async function handleSubmitSearch(data) {
    api.get(`/repositories?q=${data.searchTerm}&per_page=4&order=${data.order}&sort=${data.sort}`)
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
      <div className="welcome-message">
        Buscador de repositórios
        <p>Digite um termo relacionado a sua busca, utilize os filtros caso deseje uma busca mais específica.</p>
      </div>
      <SearchForm onSubmit={handleSubmitSearch} />

      {notFound !== '' && results == 0 && (
        <h4 style={{marginTop: '20px'}}>{notFound}</h4>
      )}

      {results != 0 && (
        <div className="input-block">
          <div className="header">
            <strong>{totalItems} repositórios encontrados</strong>
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
