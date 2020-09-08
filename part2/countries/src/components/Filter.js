import React from 'react'

const Filter = (props) => {
    console.log('Filter', props)

    const field = props.field
    const setField = props.setField

    const label = props.label !== undefined ? props.label : 'search:'


    const handlerFilter = (event) => 
    {
      setField(event.target.value)
    }

    return (
        <div>{label} <input value={field} onChange={handlerFilter}/></div>
    )
}

export default Filter