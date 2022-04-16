import React from "react";

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
  

  export default Numbers