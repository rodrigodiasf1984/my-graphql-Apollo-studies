import React from 'react';
import './App.css';
import {gql} from 'apollo-boost'; 
import { useQuery } from '@apollo/react-hooks'
import Comment from "./components/Comment";
import Form from './components/Form';

const GET_COMMENTS=gql`
  query {
    comments{
      id 
      name     
      content
    }
  }
`;

function App() {
  const {loading, error, data}= useQuery(GET_COMMENTS);

  if(error) return 'Error, deu ruim demais.'; 

  return (
   <>
      <h1>RocketComments</h1>
      <Form/>
      {loading ? "Carregando..." : (
        <section className="comments">
         {data.comments.map(({ id, name, content }) => (
           <Comment key={id} name={name} description={content} />
         ))}
        </section>
      )}      
   </>
  );
}

export default App;
