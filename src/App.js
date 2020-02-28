import React, { useState, useEffect } from 'react';

import Pagination from 'react-js-pagination';

import './App.css';
import './global.css';

import api from './services/api';

import SearchForm from './components/searchForm';
import SearchResults from './components/searchResults';

function App() {
  const [ results, setResults ] = useState([]);
  const [ perPage ] = useState(10);
  const [ page, setPage ] = useState(1);

  async function handleSubmitSearch(data) {
    localStorage.setItem('searchItems', JSON.stringify(data))
    api.get(`/repositories?q=${data.searchTerm}${data.language}&page=${page}&per_page=${perPage}&order=${data.order}&sort=${data.sort}`)
    .then(response => {
      setResults(response.data);
    });
  }

  function handlePageChange(pageNumber) {
    setPage(pageNumber);
  }

  useEffect(() => {
    let localData = localStorage.getItem('searchItems')
    handleSubmitSearch(JSON.parse(localData))
  }, [page])

  useEffect(() => {
    setPage(1)
  }, [localStorage.getItem('searchItems')])

  return (
    <div id="app">
      <div className="welcome-message">
        Buscador de repositórios
        <p>Digite um termo relacionado a sua busca, utilize os filtros caso deseje uma busca mais específica.</p>
      </div>

      <SearchForm onSubmit={handleSubmitSearch} />

      {results.total_count == 0 && (
        <p style={{marginTop: '20px'}}>Nenhum repositório foi encontrado com este termo de busca</p>
      )}

      {page > 100 && <p style={{fontSize: '18px', marginTop: '20px'}}>Apenas os 1000 primeiros resultados estão disponíveis</p>}

      {results != 0 && results.total_count !== 0 && page < 101 && (
        <>
          <div className="input-block">
            <div className="header">
              <strong>{results.total_count} repositórios encontrados</strong>
            </div>
            <ul>
              {results.items.map(data => (
                <SearchResults key={data.id} item={data} />
              ))}
            </ul>
          </div>
            <Pagination activePage={page} itemsCountPerPage={perPage} totalItemsCount={parseFloat(results.total_count)} onChange={handlePageChange} itemClass="pagination-item" itemClassLast="pagination-last-item" />
        </>
      )}
    </div>
  );
}

export default App;
