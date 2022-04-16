import { useState } from 'react'
import Numbers from './components/numbers'
import Filter from './components/filter'
import PersonForm from './components/personform'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  const addNumber = (event) => {
    event.preventDefault()
    if(! persons.find(person => person.name === newName )){
      const numObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(numObject))
      setNewName('')
      setNewNumber('')
      setFilter('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const formProperties = {
    submitAction: addNumber,
    buttonText: 'Add',
    inputs:[
    {
      label: 'name',
      value: newName,
      onChange: handleNameChange,
      id:1
    },
    {
      label: 'number',
      value: newNumber,
      onChange: handleNumberChange,
      id:2
    }
  ]}
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilter} label='filter shown with:' />
      <h3>Add a new</h3>
      <PersonForm props={formProperties} /> 
      <h3>Numbers</h3>
      <Numbers persons={persons} pfilter={filter} />
    </div>
    
  )
}

export default App
