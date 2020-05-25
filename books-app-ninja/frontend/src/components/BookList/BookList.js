import React from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';

const GET_BOOKS = gql`
  {
    books{
      name
      genre
      imageUrl
      id
    }
  }
`;

function BookList() {
  const {loading, error, data}= useQuery(GET_BOOKS);

  if(error) return 'Error, deu ruim demais.'; 
  return (
    <div>      
      {loading ? "Carregando..." : (
        <div >
          <ul>
            {data.books.map(({ id, name, genre, imageUrl }) => (
            <li key={id}>
              Book name: {name} Book genre: {genre}
              {/* <img src={imageUrl}/> */}
            </li>
            ))}
          </ul>
        </div>
      )}      
    </div>
  );
}

export default BookList;
