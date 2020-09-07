import React from 'react'

const PersonForm = (props) => {
    console.log('PersonForm', props)

    const newName = props.newName
    const setNewName = props.setNewName
    const newNumber = props.newNumber
    const setNewNumber = props.setNewNumber
    const persons = props.persons
    const setPersons = props.setPersons

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

    const handlerNewName = (event) => {
        setNewName(event.target.value)
      }
    
      const handlerNewNumber = (event) => {
          setNewNumber(event.target.value)
      }

    return (
    <div>
      <form onSubmit={addNewPerson}>
        <div>name: <input value={newName} onChange={handlerNewName}/></div>
        <div>number: <input value={newNumber} onChange={handlerNewNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
    )
}

export default PersonForm