import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import phonebookService from './services/phonebook'

const App = () => {

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('') 

  const effectHook = () => {
    console.log('effect')
    phonebookService.getAll()
    .then(response => {
      setPersons(response)
    })
    .catch(error => {
      alert("Error while loading db, check console.")
      console.log(error)
    })
  }
  useEffect(effectHook, [])


  return (
    <div>
      <h2>Search</h2>
      <Filter field={search} setField={setSearch} />
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={person => person.name.toLowerCase().includes(search.toLowerCase())}/>
    </div>
  )
}

export default App