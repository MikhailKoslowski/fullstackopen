import React from 'react'

import phonebookService from '../services/phonebook'

const PersonForm = (props) => {
    console.log('PersonForm', props)

    const newName = props.newName
    const setNewName = props.setNewName
    const newNumber = props.newNumber
    const setNewNumber = props.setNewNumber
    const persons = props.persons
    const setPersons = props.setPersons

    const timedNotification = props.timedNotification !== undefined ? props.timedNotification : (text,type) => alert(text)

    const addNewPerson = (event) => {
        event.preventDefault()
      const newPerson = {
          name: newName,
          number: newNumber
      }
  
      if (persons.find(person => person.name === newName)) {
          const person = persons.find(person => person.name === newName)
          if (window.confirm(`${person.name} is already added, update the number?`)){
            person.number = newNumber
            phonebookService.update(person.id, person)
            .then(response => {
              setPersons(persons.map(p => p.id===response.id?response:p))
              setNewNumber('')
              setNewName('')
              timedNotification(`${response.name} updated`,'success')
            })
            .catch(error => {
              timedNotification(error.response.data.error, 'error')
              console.log(error)
            })
          }
        
      } else {

          phonebookService.create(newPerson)
            .then(response => {
              setPersons(persons.concat(response))
              setNewName('')
              setNewNumber('')
              timedNotification(`${response.name} added`,'success')
            })
            .catch(error => {              
              timedNotification(error.response.data.error, 'error')
              console.log(error)
            })
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