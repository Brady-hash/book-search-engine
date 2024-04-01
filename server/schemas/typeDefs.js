const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}
  
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
}
  
type Auth {
    token: String!
    user: User
}
  
type Query {
    getCurrentUser: User
}
  
input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    saveBook(userId: ID!, bookInput: BookInput!): User
    deleteBook(userId: ID!, bookId: String!): User
}
`;

module.exports = typeDefs;