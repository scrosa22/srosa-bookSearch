import { gql } from '@apollo/client';

export const QUERY_User = gql`

query User {
    User {
    _id
    username
    email
    password
    savedBooks
    }
}
`;

export const QUERY_Book = gql`
  query Book($_id: String) {
    Book(_id: $_id) {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }
  }
`;
