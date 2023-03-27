import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      title
      author
      published
      genres
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