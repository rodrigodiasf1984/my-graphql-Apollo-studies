import React from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';

const GET_AUTHORS=gql`
  {
    authors{
      name
      id
    }
  }
`

function AddBook() {
  const {loading, error, data}= useQuery(GET_AUTHORS);

  if(error) return 'Error, deu ruim demais.'; 
  return (
    <div>      
      {loading ? "Carregando..." : (
        <form id="add-book">
          <div className="field">
            <label htmlFor="book-name">Book name:</label>
            <input type="text"/>
          </div>
          <div className="field">
          <label htmlFor="book-genre">Genre:</label>
            <input type="text"/>
          </div>
          <div className="field">
          <label htmlFor="book-author">Author:</label>
            <select>
              <option>Select author</option>
            </select>
          </div>
          <button>+</button>
        </form>
      )}      
    </div>
  );
}

export default AddBook;