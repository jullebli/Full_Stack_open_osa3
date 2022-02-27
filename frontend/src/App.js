import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    phonebookService
      .getAll()
        .then(persons => {
        setPersons(persons)
        })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(e => e.name === newName)) {
    /*  if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === newName)
        const id = person.id
        const changedPerson = {...person, number: newNumber}
        phonebookService
          .update(changedPerson)
            .then (response => {
              setPersons(persons.map(person => person.id !== id ? person : response))
              setMessage(
                `Changed number of ${changedPerson.name}`
              )
              setTimeout(() => {
                setMessage(null)
              }, 3000)
            })
            .catch(() => {
              setMessage(
                `Information of ${changedPerson.name} has already been removed from server`
              )
              setIsError(true)
              setTimeout(() => {
                setMessage(null)
                setIsError(false)
                }, 3000  )
              setPersons(persons.filter(n => n.id !== id))
            })         
      }
      */

    } else {
      const newPerson = { name: newName, number: newNumber }
      phonebookService
        .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setMessage(
              `Added ${newPerson.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
    }

    setNewName('')
    setNewNumber('')
  }

  const removePerson = (event, {person}) => {
    event.preventDefault()
    const removedName = person.name
    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebookService
        .remove(person)
        .then(person => {
          
          setMessage(
            `Deleted ${removedName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(() => {
          setMessage(
            `Information of ${removedName} has already been removed from server`
          )
          setIsError(true)
          setTimeout(() => {
            setMessage(null)
            setIsError(false)
          }, 3000)
        })
        setPersons(persons.filter(n => n.id !== person.id))  
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value) 
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError}/>
      <Filter value={filterValue} onChange={handleFilterChange} />
      
      <h3>add a new</h3>

      <PersonForm onSubmit={addPerson} nameValue={newName} nameOnChange={handleNameChange}
      numberValue={newNumber} numberOnChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={persons} filterValue={filterValue} removePerson={removePerson} />
    </div>
  )
}

export default App
