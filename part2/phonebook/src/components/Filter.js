import React from 'react'

const Filter = (props) => {
    console.log('Filter', props)

    const field = props.field
    const setField = props.setField


    const handlerFilter = (event) => 
    {
      setField(event.target.value)
    }

    return (
        <div>search:<input value={field} onChange={handlerFilter}/></div>
    )
}

export default Filter