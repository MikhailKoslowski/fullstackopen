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

const Statistic = (props) => {
  console.log("Statistic props", props)
  const name = props.name
  const value = props.value

  return (
    <>
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
    </>
  )
}

const Statistics = (props) => {
  console.log("Statistics props", props)
  const good = props.counters.good
  const neutral = props.counters.neutral
  const bad = props.counters.bad
  const total = good + neutral + bad

  if (total < 1) 
  {
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  }

  return (
    <div>
      <table>
        <tbody>
        <Statistic name='good' value={good}/>
        <Statistic name='neutral' value={neutral}/>
        <Statistic name='bad' value={bad}/>
        <Statistic name='average' value={(good-bad)/total}/>
        <Statistic name='positive' value={100*good/total+'%'}/>
        </tbody>
      </table>
    </div>
  )
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
      <Statistics counters={{good:good, neutral:neutral, bad:bad}}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)