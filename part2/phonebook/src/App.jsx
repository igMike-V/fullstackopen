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
    // Extract person from state if they exist
    const existingPerson = persons.find(person => person.name === newName)

    // Make a new person object to add or update in the server
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    // Check state for existing person to determine if we need to update or add to server
    if(existingPerson){
      // Person is already in the phone book we should ask if user wants to update
      if (window.confirm(`${newName} is already added the phone book, Replace the old Number with a new one?`)) {
        personService.update(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => {
              return person.id === updatedPerson.id ? updatedPerson : person
            }))
          })
      }

    } else {
      // Person is not in the phone book we are safe to add an new entry
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

  const handleDelete = id => {
    if (window.confirm(`Are you sure you want to delete ${persons.find(person => person.id === id).name} `)){
      personService
        .deleteEntry(id)
        .then(req => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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

      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />

    </div>
  )
}

export default App