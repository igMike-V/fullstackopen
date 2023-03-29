const Author = require('../models/Author')
const Book = require('../models/Book')

module.exports = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async () => await Books.find({}),
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