import { useState } from 'react'

//button compenent
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setVote] = useState(new Uint8Array(7))

  const updateSelected = (max) => {
    const rndNum = Math.floor(Math.random() * max)
    setSelected(rndNum)
  }

  //update with vote button
  const updateVote = (vote)=> {
    const copy = { ...points }
    copy[vote] += 1
    setVote(copy);
  }

  const getMax = () => {
    const newPoints = { ...points }
    let maxNum = 0
    let maxKey = 0
    for(var i=0; i < Object.keys(newPoints).length; i++){
      if(maxNum < newPoints[i]){
        maxNum = newPoints[i]
        maxKey = i
      }
    }
    return(maxKey)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text='vote' onClick={()=>updateVote(selected)} />
      <Button text='next anecdote' onClick={()=>updateSelected(7)} />
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[getMax()]}</p>
      <p>has {points[getMax()]} votes</p>
    </div>
  )
}

export default App