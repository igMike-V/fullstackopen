import { useState } from 'react'

//const Numbers = ({persons}) => persons.map(person => <Person key={person.name} person={person} />)

const Numbers = ({persons, pfilter}) => {
  if(pfilter){
    let personsFiltered = persons.filter(p => p.name.toLowerCase().includes(pfilter.toLowerCase()))
    if(personsFiltered.length > 0){
      return(<>{personsFiltered.map(person => <Person key={person.name} person={person} />)}</>)
    } else {
      return(<>Sorry that filter returned no results.</>)
    }
  } else {
    return (<>{persons.map(person => <Person key={person.name} person={person} />)} </>)
  }
}


const Person = ({person}) => <p>{person.name} {person.number}</p>

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

  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with: <input value={filter} onChange={handleFilter} />
      <h2>Add a new</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} pfilter={filter} />
    </div>
    
  )
}

export default App
