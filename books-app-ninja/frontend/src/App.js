import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks'
import cors from 'cors';

//components
import BookList from './components/BookList/BookList';


// apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
});

function App() {  
  return (
    <ApolloProvider client={client}>
      <div id="Main">
        <h1>Hello World</h1>
        <BookList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
