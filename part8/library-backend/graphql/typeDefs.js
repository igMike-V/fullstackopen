module.exports = `
 type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
  }
  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]
    id: ID!
  }
  type Author {
    name: String
    bookCount: Int!
    born: Int
  }
  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;
