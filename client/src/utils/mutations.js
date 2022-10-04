import { gql } from '@apollo/client';

export const SAVE_BOOK = gql`
type Mutation {
    addBook(
        userId: ID!, 
        authors: [String], 
        description: String!, 
        bookId: String!, 
        image: String, 
        link: String, 
        title: String!): User
}
`;

export const ADD_USER = gql`
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
}`;

export const REMOVE_BOOK = gql`
type Mutation {
    addBook(removeBook(userId: ID!, authors: [String], description: String!, bookId: String!, image: String, link: String, title: String!): User
}`;

export const LOGIN_USER = gql`
type Mutation {
    login(email: String!, password: String!): Auth
}`;