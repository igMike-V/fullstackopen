// eslint-disable-next-line no-unused-vars
import React from 'react'


const Persons = ({ persons, filter, handleDelete }) => {

  const directory = persons.filter(person => person.name.toLowerCase().match(filter.toLowerCase()))
    .map(person => {
      return (
        <p className="person" key={person.name}>
          {person.name} <span className="phone-number">{person.number}</span>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </p>
      )
    })
  return(
    <div className="persons">
      {directory}
    </div>
  )
}

export default Persons