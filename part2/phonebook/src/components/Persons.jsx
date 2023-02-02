import React from "react"


const Persons = ({persons, filter}) => {

    const directory = persons.filter(person => person.name.toLowerCase().match(filter.toLowerCase()))
    .map(person => {
      return (
          <p className="person" key={person.name}>
            {person.name} <span className="phone-number">{person.number}</span>
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