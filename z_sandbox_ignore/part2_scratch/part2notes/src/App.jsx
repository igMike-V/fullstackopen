import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Note from './components/Note'

const App = () => {
  // Application State
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(()=>{
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(res => {
        console.log('promise fulfilled')
        setNotes(res.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          onChange={handleNoteChange} 
          value={newNote} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App