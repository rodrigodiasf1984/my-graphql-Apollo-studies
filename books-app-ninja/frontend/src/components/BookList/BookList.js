import React from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';

const GET_BOOKS = gql`
  {
    books{
      name
      id
    }
  }
`;

function BookList() {
  const {loading, error, data}= useQuery(GET_BOOKS);

  if(error) return 'Error, deu ruim demais.'; 
  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
      </ul>

      {loading ? "Carregando..." : (
        <div >
          <ul>
            {data.books.map(({ id, name, genre }) => (
            <li key={id}>name</li>
            ))}
          </ul>
        </div>
      )}      
    </div>
  );
}

export default BookList;
