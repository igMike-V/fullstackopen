import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
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
      <p>
      good {good} <br /> 
      neutral {neutral}<br />  
      bad {bad} <br />
      all {bad + neutral + good} <br />
      average {((bad * -1) + (good * 1) ) / (bad + neutral + good)} <br />
      positive {(good / (bad + neutral + good)) * 100} %
      </p> 
    </div>
  )
}

export default App