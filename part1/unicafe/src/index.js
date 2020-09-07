import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  console.log("Button props", props)
  const label = props.label
  const handleClick = props.handleClick

  return (
    <>
    <button onClick={handleClick}>
      {label}   
    </button>
    </>
  )
}

const buttonClick = (counter, setCounter) => {
    return ()=>setCounter(counter + 1)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button label="good" handleClick={buttonClick(good, setGood)} />
      <Button label="neutral" handleClick={buttonClick(neutral, setNeutral)} />
      <Button label="bad" handleClick={buttonClick(bad, setBad)}  />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)