import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import PersonForm from './components/PersonForm'
// eslint-disable-next-line no-unused-vars
import Filter from './components/Filter'
// eslint-disable-next-line no-unused-vars
import Persons from './components/Persons'
import personService from './services/persons'
// eslint-disable-next-line no-unused-vars
import Notifications from './components/Notifications'

const App = () => {

  // State
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({
    isError: false,
    text: null,
    messageLive: false,
  })

  // Load persons from server
  useEffect(() => {
    personService
      .getAll()
      .then(personList => {
        setPersons(personList)
      })
      .catch(error => console.log('problem communicating with the server: ', error ))
  }, [])

  // Clean up message
  useEffect(() => {
    if(notification.messageLive){
      setTimeout(() => {
        setNotification({ isError: false, text: null, messageLive: false })
      }, 6000)
    }
  }, [notification])

  // Set Notification messages
  const setMessage = message => {
    setNotification({
      isError: false,
      text: message,
      messageLive: true,
    })
  }

  // Set Error Message
  const setError = message => {
    setNotification({
      isError: true,
      text: message,
      messageLive: true,
    })
  }

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
            setMessage(`Updated Phone number for: ${updatedPerson.name}`)
          })
          .catch(error => {
            setError( error.response.data )
          })
      }

    } else {
      // Person is not in the phone book we are safe to add an new entry
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${returnedPerson.name}`)
        })
        .catch(error => {
          console.log('could not add person to server: ', error )
          setError(error.response.data)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = id => {
    const personName = persons.find(person => person.id === id).name
    if (window.confirm(`Are you sure you want to delete ${personName} `)){
      personService
        .deleteEntry(id)
        .then(req => {
          console.log(req)
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`${personName} has been removed from your list`)
        })
        .catch(error => {
          console.log('Error Deleting Entry', error)
          setError(`Information for ${personName} was already removed from the server.`)
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
      <Notifications message={notification.text} isError={notification.isError} />


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