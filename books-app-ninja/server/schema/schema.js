const graphql = require('graphql');
const _= require('lodash');

const{GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID}= graphql;

var books = [
  {name: 'Planet of Apes', genre: 'Fiction', id:'1'},
  {name: 'Foundation', genre: 'Fiction', id:'2'},
  {name: 'The Silmarillion', genre: 'Fantasy', id:'3'},
]

const BookType = new GraphQLObjectType({
  name:'Book',
  fields:() => ({
    id: {type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString}
  })
});

const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    book:{
      type:BookType,
      args:{id: {type:GraphQLID}},
      resolve(parent, args){
        // code to get data from db / other source
        console.log(typeof(args.id))
        return _.find(books,{id:args.id});
      }
    }
  }
});

module.exports  =new GraphQLSchema({
  query: RootQuery
});