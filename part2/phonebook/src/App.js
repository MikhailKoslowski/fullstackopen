import React, { useState } from 'react'

const App = () => {
  /*
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  */ 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')


  const handlerNewName = (event) => {
    setNewName(event.target.value)
  }

  const handlerNewNumber = (event) => {
      setNewNumber(event.target.value)
  }

  const handlerSearch = (event) => 
  {
      setSearch(event.target.value)
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

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Search</h2>
      <div>search:<input value={search} onChange={handlerSearch}/></div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>name: <input value={newName} onChange={handlerNewName}/></div>
        <div>number: <input value={newNumber} onChange={handlerNewNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {personsToShow.map(person=>
        <li key={person.name}>{person.name} {person.number}</li>
      )}
      </ul>
    </div>
  )
}

export default App