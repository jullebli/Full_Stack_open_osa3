import React from 'react'

const Person = ({person, removePerson}) => {
  return (
    <p>{person.name} {person.number} <button onClick={(event) => removePerson(event, {person})}>delete</button></p>
  )
}

export default Person
