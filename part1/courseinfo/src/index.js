import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  const jsx = []
  for (let index = 0; index < props.parts.length; index++) {
    const part = props.parts[index];
    const exercise = props.exercises[index];
    jsx.push(
      <p>{part} {exercise}</p>
    )
  }
  return jsx
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total total={exercises1+exercises2+exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))