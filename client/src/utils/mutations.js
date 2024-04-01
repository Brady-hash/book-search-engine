import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        savedBooks {
          _id
          authors
          description
          bookId
          image
          link
          title
      }
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedBooks {
          _id
          authors
          description
          bookId
          image
          link
          title
      }
    }
  }
`

export const SAVE_BOOK = gql`
  mutation SaveBook($bookData: BookInput!) {
  saveBook(bookData: $bookData) {
    _id
    email
    password
    username
    savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`
export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      email
      password
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
      username
    }
  }`
