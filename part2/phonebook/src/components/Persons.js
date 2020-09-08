import React from 'react'

const Persons = (props) => {
    console.log('Persons', props)
    const persons = props.persons
    const deleteCallback = props.deleteCallback !== undefined ? props.deleteCallback : () => alert("no callback set")

    const filter = props.filter!==undefined ? props.filter : ()=>true

    //const filter = props.filter
    const personsToShow = persons.filter(filter)

    return (
        <div>
        <ul>
      {personsToShow.map(person=>
        <li key={person.name}>
          {person.name} 
          {person.number} 
          <button onClick={() => deleteCallback(person)}>delete</button>
        </li>
      )}
      </ul>
      </div>
    )
}

export default Persons