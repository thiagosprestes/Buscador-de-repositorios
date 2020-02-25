import React, { useState } from 'react';
import './App.css';
import './global.css';

import api from './services/api';

import SearchForm from './components/searchForm';
import SearchResults from './components/searchResults';

function App() {
  const [ results, setResults ] = useState([])
  const [ notFound, setNotFound] = useState('')

  async function handleSubmitSearch(data) {
    api.get(`/search/repositories?q=${data}&per_page=2`)
    .then(response => {
      setResults(response.data.items)
      
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

      {results != 0 && (
        <div className="input-block">
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
