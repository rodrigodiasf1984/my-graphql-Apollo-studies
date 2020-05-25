const graphql = require('graphql');
const _= require('lodash');
const Book =  require('../models/book');
const Author =  require('../models/author');

const{ 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLID, 
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,  
}= graphql;



const BookType = new GraphQLObjectType({
  name:'Book',
  fields:() => ({
    id: {type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    imageUrl:{type:GraphQLString},
    author:{
      type:AuthorType,
      resolve(parent, args){
        console.log(parent);
        //return _.find(authors, {id:parent.authorId});
        return Author.findById(parent.authorId);
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
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return _.filter(books, {authorId: parent.id})
        return Book.find({authorId:parent.id})
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
        //return _.find(books,{id:args.id});
        return Book.findById(args.id);
      }
    },    
    author:{
      type: AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent, args){
        //return _.find(authors,{id:args.id} );
        return Author.findById(args.id);
      }
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return books;
        return Book.find({});
      }
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        //return authors;
        //retorna todos os authors que se encontram na BD
        return Author.find({});

      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addAuthor:{
      type: AuthorType,
      args:{
        name:{type: new GraphQLNonNull(GraphQLString)},
        age: {type:new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        //cria um novo object com os dados enviados pelo front
        let author = new Author({
          name:args.name,
          age:args.age
        });
        //salva o novo object na bd
        return author.save();
      }
    },
    addBook:{
      type: BookType,
      args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        genre:{type: new GraphQLNonNull(GraphQLString)},
        imageUrl:{type: new GraphQLNonNull(GraphQLString)},
        authorId:{type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let book = new Book({
          name:args.name,
          genre:args.genre,
          imageUrl:args.imageUrl,
          authorId:args.authorId
        });
        return book.save();
      }
    }
  }
})

module.exports  =new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});