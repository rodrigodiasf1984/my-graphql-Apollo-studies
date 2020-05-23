const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URL,{
  useCreateIndex:true,
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('Database Successfully Connected')}, error =>{
    console.log(error);
  })

app.use('/graphql', graphqlHTTP({
  schema, 
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Listening for requests on port 4000')
});