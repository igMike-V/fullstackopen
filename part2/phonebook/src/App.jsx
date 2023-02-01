import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newName)
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)

  }

  const directory = persons.map(person => <p className="person" key={person.name}>{person.name}</p>)


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleInputChange} />
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {directory}

    </div>
  )
}

export default App