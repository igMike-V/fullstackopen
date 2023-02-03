import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  // State
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Load persons from server
  useEffect(() => {
    personService
      .getAll()
      .then(personList => {
        setPersons(personList)
      })
      .catch(error => console.log('problem communicating with the server: ', error ))
  }, [])

  // Submission of Person Form
  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      console.log(newName)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService 
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => console.log('could not add person to server: ', error ))
    }
    
    setNewName('')
    setNewNumber('')
  }

  // Controlled inputs
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      <h1>Phonebook</h1>

      <Filter handleFilter={handleFilter} filter={filter} />
     
      <h2>Add a new entry</h2>
      
      <PersonForm 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newName={newName} 
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      
      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} />

    </div>
  )
}

export default App