import { useState } from 'react'

//button compenent
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  //check for empty feedback to hide stats
  if (good === 0 && neutral === 0 && bad === 0){
    return <h4>No feedback given</h4>
  }
  return(  
    <>
  <p>
      good {good} <br /> 
      neutral {neutral}<br />  
      bad {bad} <br />
      all {bad + neutral + good} <br />
      average {((bad * -1) + (good * 1) ) / (bad + neutral + good)} <br />
      positive {(good / (bad + neutral + good)) * 100} %
    </p>
    </>
  ) 
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  // handle incrementing of stats
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  const handleGood = () => setGood(good + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App