import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Genres = ({ setGenre, genre, genreList }) => {
  return (
    <div>
      <button onClick={() => setGenre(null)} className={genre === null ? 'genre-btn selected' : 'genre-btn'} >all</button>
      {genreList.map(g => <button key={g} onClick={() => setGenre(g)} className={g === genre ? 'genre-btn selected' : 'genre-btn'}>{g}</button>)}
    </div>
    )
}

const Books = () => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }
  
  const allBooks = result.data.allBooks

  const genreExtractor = (books) => {
    let genreList = []
    // Iterate over each genre in array and return a flattened array
    books.forEach(book => {
      book.genres.forEach(g => genreList.push(g))
    })
    // Cast array into a set to remove duplicates and convert back to an array to return
    return Array.from(new Set(genreList))
  }

  const bookList = () => {
    let sortedBooks = [...allBooks]
    if (genre) {
      sortedBooks = sortedBooks.filter(book => book.genres.find(g => g === genre))
    }

    return sortedBooks.map(book => {
      return (
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published}</td>
        </tr>
      )
    })
  }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList()}
        </tbody>
      </table>
      <Genres setGenre={setGenre} genre={genre} genreList={genreExtractor(allBooks)} />
    </div>
  )
}

export default Books
