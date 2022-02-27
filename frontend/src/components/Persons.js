import React from 'react'
import Person from './Person'

const Persons = ({persons, filterValue, removePerson}) => {

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  return (
    <div>
      {personsToShow.map(person => 
      <Person key={person.id} person={person} removePerson={removePerson} />
      )}
    </div>
  )  
}

export default Persons
