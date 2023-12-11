const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

let books = [
    { id: "1", genre: 'fantasy', name: 'book1' },
    { id: "2", genre: 'fantasy', name: 'book2' },
    { id: "3", genre: 'comedy', name: 'book3' }
];
let authors = [
    { id: "1", age: 40, name: 'Mom' },
    { id: "2", age: 20, name: 'Melkii' },
    { id: "3", age: 28, name: 'Nastya' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find(book => book.id === args.id);
            }
        }, 
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find(item => item.id === args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});