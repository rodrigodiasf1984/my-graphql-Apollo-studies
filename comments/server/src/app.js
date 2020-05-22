import 'dotenv/config';
import { ApolloServer } from 'apollo-server'; 
import mongoose from 'mongoose';
import schema from './schema';

const server = new ApolloServer({
  schema, 
  playground: process.env.NODE_ENV === 'development'
});

mongoose.connect(process.env.MONGO_URL,{
        useCreateIndex:true,
        useNewUrlParser: true,
        useUnifiedTopology: true}).then(()=> {
console.log('Database Successfully Connected')},error =>{
console.log(error)})

export default server; 
 