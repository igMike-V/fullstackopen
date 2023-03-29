const Author = require('../models/Author')
const Book = require('../models/Book')

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
    addBook: async (_, {title, author, published, genres}) => {
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
        console.log(error)
      }
      
    },
    editAuthor: (root, args) => {
      return null
    }
  },
}