import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handlerNewName = (event) => {
    setNewName(event.target.value)
  }

  const addNewPerson = (event) => {
      event.preventDefault()
    const newPerson = {
        name: newName
    }

    if (persons.find(person => person.name === newName)) {
        alert(`${newName} is already added to the phonebook.`)
    } else {
        setNewName('')
        setPersons(persons.concat(newPerson))
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handlerNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map(person=>
        <li key={person.name}>{person.name}</li>
      )}
      </ul>
    </div>
  )
}

export default App