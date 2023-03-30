import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    title
    author {
      name
      born
    }
    published
    genres
    id
  }
}
`
export const ME = gql`
  query Me {
  me {
    username
    id
    favoriteGenre
  }
}
`

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
      ) {
      title
      author
      published
      genres
    }
  }
`

export const EDIT_BORN = gql`
  mutation EditAuthor($setBornTo: Int!, $name: String!) {
  editAuthor(
    setBornTo: $setBornTo,
    name: $name
    ) {
    name
    born
    bookCount
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

