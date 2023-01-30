import { useState } from 'react'

//button component
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
  // convert lines into component
  return(  
    <table>
      <tbody>      
      <StatisticLine text="good" values={props} />
      <StatisticLine text="neutral" values={props} />
      <StatisticLine text="bad" values={props} />
      <StatisticLine text="all" values={props} />
      <StatisticLine text="average" values={props} />
      <StatisticLine text="positive" values={props} />
      </tbody>
    </table>

  ) 
}

//output Statistics depending on type
const StatisticLine = (props) => {
  let output = props.values[props.text]
  if(props.text === 'all'){
    output = props.values.good + props.values.neutral + props.values.bad
  } else if( props.text === 'average'){
    output = ((props.values.bad * -1) + (props.values.good * 1) ) / (props.values.bad + props.values.neutral + props.values.good)
  } else if( props.text === 'positive'){
    output = ((props.values.good / (props.values.bad + props.values.neutral + props.values.good)) * 100)
  }
  return(
    <tr>
    <td>{props.text}</td>
    <td>{output}</td>
    </tr>
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