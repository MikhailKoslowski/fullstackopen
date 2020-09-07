import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const randInt = (min, max) => {
  return min + Math.floor((max-min)*Math.random())
}

const handleVote = (votes, setter, index) => {
  const newVotes = [...votes]
  newVotes[index] += 1
  setter(newVotes)
}

const handleNext = (length, setter) => {
  setter(randInt(0,length))
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))

  console.log(selected)
  console.log(votes)

  return (
    <>
    <div>
      {props.anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
    </div>
    <div>
      <button onClick={() => handleVote(votes, setVotes, selected)}>vote</button>
      <button onClick={() => handleNext(props.anecdotes.length, setSelected)}>next anecdote</button>
    </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)