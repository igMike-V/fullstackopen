import { useState } from 'react'

const App = () => {

  // State
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  const directory = persons.map(person => {
    return (
        <p className="person" key={person.name}>{person.name} <span className="phone-number">{person.number}</span></p>
      
    )
  })


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
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