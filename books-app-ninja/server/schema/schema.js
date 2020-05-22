const graphql = require('graphql');
const _= require('lodash');

const{ 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLID, 
  GraphQLInt,
  GraphQLList
}= graphql;

var books = [
  {name: 'Planet of Apes', genre: 'Fiction', id:'1', authorId:'2'},
  {name: 'Foundation', genre: 'Fiction', id:'2', authorId:'1'},
  {name: 'The Silmarillion', genre: 'Fantasy', id:'3', authorId:'3'},
  {name: 'The lord of the rings 1', genre: 'Fantasy', id:'3', authorId:'3'},
  {name: 'The lord of the rings 2', genre: 'Fantasy', id:'3', authorId:'3'},
  {name: 'The lord of the rings 3', genre: 'Fantasy', id:'3', authorId:'3'},
];

var authors = [
  {name: 'Isaac Asimov', age: 72, id:'1'},
  {name: 'Pierre Boulle', age: 81, id:'2'},
  {name: 'J. R. R. Tolkien', age: 81, id:'3'},
];

const BookType = new GraphQLObjectType({
  name:'Book',
  fields:() => ({
    id: {type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    author:{
      type:AuthorType,
      resolve(parent, args){
        console.log(parent);
        return _.find(authors, {id:parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields:() => ({
    id: {type:GraphQLID},
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    books:{
      type:new GraphQLList(BookType),
      resolve(parent, args){
        return _.filter(books, {authorId: parent.id})
      }
    }
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
    },    
    author:{
      type: AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent, args){
        return _.find(authors,{id:args.id} );
      }
    }
  }
});

module.exports  =new GraphQLSchema({
  query: RootQuery
});