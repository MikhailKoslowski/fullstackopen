import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handlerNewName = (event) => {
    setNewName(event.target.value)
  }

  const handlerNewNumber = (event) => {
      setNewNumber(event.target.value)
  }

  const addNewPerson = (event) => {
      event.preventDefault()
    const newPerson = {
        name: newName,
        number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
        alert(`${newName} is already added to the phonebook.`)
    } else {
        setNewName('')
        setNewNumber('')
        setPersons(persons.concat(newPerson))
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>name: <input value={newName} onChange={handlerNewName}/></div>
        <div>number: <input value={newNumber} onChange={handlerNewNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map(person=>
        <li key={person.name}>{person.name} {person.number}</li>
      )}
      </ul>
    </div>
  )
}

export default App