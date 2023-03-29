const Author = require('../models/Author')
const Book = require('../models/Book')
const User = require('../models/User')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

module.exports = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (_, {author, genre}) => {
      const bookReturn = await Book.find({})
        .populate('author')
      let filteredBooks = [...bookReturn]
      if (author) {
        filteredBooks = filteredBooks.filter(book => book.author.name === author)
      }
      if (genre) {
        filteredBooks = filteredBooks.filter(book => book.genres.find(element => element === genre))
      }
      return filteredBooks
    },
    allAuthors: async () => await Author.find({})
  },
  Mutation: {
    addBook: async (_, {title, author, published, genres, ...args}) => {
      // check for author
      let authorRef = await Author.findOne({name: author})
      if(!authorRef) {
        // Create a new author
        authorRef = new Author({name: author})
        authorRef = await authorRef.save()
      }

      // Create the book
      const book = new Book({
        title, 
        author: authorRef._id,
        published,
        genres
      })
      try {
        const savedBook = await book.save()
        return savedBook
      } catch ( error ) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      
    },
    editAuthor: async (_, { name, setBornTo }) => {
      const author = await Author.findOne({ name })
      if (author) {
        author.born = setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Editing date failed', {
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
              invalidArgs: name,
              error
            }
          })
        }
      } else {
        throw new GraphQLError('date edit failed, invalid author name', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: name,
          }
        })
      }
    },
    createUser: async (_, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre})
      try {
        const savedUser = await user.save()
        return savedUser
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
      }
    },
  },
}