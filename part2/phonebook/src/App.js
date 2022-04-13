import { useState } from 'react'

const Numbers = ({persons}) => persons.map(person => <Person key={person.name} person={person} />)

const Person = ({person}) => <p>{person.name}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const addNumber = (event) => {
    event.preventDefault()
    const numObject = {
      name: newName,
    }
    setPersons(persons.concat(numObject))
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
    
  )
}

export default App
