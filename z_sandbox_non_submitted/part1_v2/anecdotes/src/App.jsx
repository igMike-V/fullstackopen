import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleClick = () => {
    let newSelected = getRandomAnecdote()
    while(newSelected === selected){
      newSelected = getRandomAnecdote
    }
    setSelected(newSelected)
  }

  const getRandomAnecdote = () => Math.floor(Math.random() * anecdotes.length)
  const handleVote = () => {
    // Make a copy of the current state, increment current key and set state
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const getTopAnecdote = () => {
    return votes.reduce((maxIndex, value, index, array) => {
      return value > array[maxIndex] ? index : maxIndex
    }, 0)

  }
  const topAnecdote = getTopAnecdote()

  return (
    <div className="App">
      <h3>{anecdotes[selected]}</h3>
      <p>has {votes[selected]} votes</p>
      <div className="buttons">
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleClick}>New Anecdote</button>
      </div>
      <h3>Anecdote with the most votes:</h3>
      <p>{anecdotes[topAnecdote]} <br /> has {votes[topAnecdote]} votes</p>
    </div>

  )
}

export default App