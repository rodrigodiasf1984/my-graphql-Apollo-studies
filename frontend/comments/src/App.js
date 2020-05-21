import React from 'react';
import './App.css';

import Comment from "./components/Comment";
import Form from './components/Form';

function App() {
  return (
   <>
      <h1>RocketComments</h1>
      <Form/>
      <section className="comments">
        <Comment name="Rodrigo Figueiredo" description="Lorem ipsum"/>
      </section>
   </>
  );
}

export default App;
