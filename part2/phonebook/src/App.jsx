import { useState } from 'react'
import EntryForm from './components/EntryForm'

const App = () => {

  // State
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      console.log(newName)
    } else {
      setPersons(persons.concat({
        name: newName,
        number: newNumber,
      }))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const directory = persons.filter(person => person.name.toLowerCase().match(filter.toLowerCase()))
    .map(person => {
      return (
          <p className="person" key={person.name}>
            {person.name} <span className="phone-number">{person.number}</span>
          </p>
      )
    })

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with <input className="filter" onChange={handleFilter} value={filter} />
      <h2>Add a new entry</h2>
      
      <EntryForm 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNameChange} 
        newName={newName} 
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      
      <h2>Numbers</h2>

      {directory}

    </div>
  )
}

export default App