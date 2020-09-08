import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import phonebookService from './services/phonebook'

import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('') 

  const [ errorMsg, setErrorMsg ] = useState({text:null, type:'success'})

  const timedNotification = (text, type) => {
    setErrorMsg({text, type})
    setTimeout(() => {setErrorMsg({text:null, type:'success'})}, 5000)
  }


  const effectHook = () => {
    console.log('effect')
    phonebookService.getAll()
    .then(response => {
      setPersons(response)
      timedNotification('DB loaded','success')
    })
    .catch(error => {
      timedNotification("Error while loading db, check console.", 'error')
      console.log(error)
    })
  }
  useEffect(effectHook, [])

  const personDeleteCallback = (person) => {
    console.log('personDeleteCallback', person)
    if (window.confirm(`Delete ${person.name}?`))
    {
      phonebookService.erase(person.id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(p => p.id !== person.id))
        timedNotification(`${person.name} deleted`,'success')
      })
      .catch(error => {
        timedNotification("Erro while deleting. check console.", 'error')
        console.log(error)
      })
    }
  }

  return (
    <div>
      <h2>Search</h2>
      <Filter
        field={search}
        setField={setSearch}
      />
      <h2>Phonebook</h2>
      <Notification message={errorMsg}/>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        timedNotification ={timedNotification}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons} 
        filter={person => person.name.toLowerCase().includes(search.toLowerCase())}
        deleteCallback = {(person) => personDeleteCallback(person)}
      />
    </div>
  )
}

export default App