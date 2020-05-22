import React, {useState} from 'react';
import {gql} from 'apollo-boost'; 
import { useQuery } from '@apollo/react-hooks'

export default function Form(){
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function addComment(name, content){

    const ADD_COMMENTS=gql`
    mutation{
      saveComment(
        input: {
         name: name
          content: content
        }
      ){
        id
        name
        content
        createdAt
        updatedAt
      }
    }
  `;
    const {loading, error, data}= useQuery(ADD_COMMENTS);
    if(error) return 'Error, deu ruim demais.';

  }

  return(    
    <form onSubmit={addComment}>
      <input
        type="text"
        placeholder="Digite o seu nome"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Digite o seu comentário"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">Comentar</button>
    </form>
  );
}