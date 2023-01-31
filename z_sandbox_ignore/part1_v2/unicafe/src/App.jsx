import { useState } from "react"
import Statistics from "./components/Statistics"

const Button = (props) => {
    return (<button onClick={props.handleClick}>{props.text}</button>)
  }
const Heading = (props) => (<h2 className="heading">{props.text}</h2>)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (type) => {
    if(type === "good"){
      setGood(good + 1)
    } else if(type === "neutral"){
      setNeutral(neutral + 1)
    } else if(type === "bad"){
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <Heading text="give feedback"/>
      <div className="buttons">
        <Button handleClick={() => handleClick("good")} text="good"/>
        <Button handleClick={() => handleClick("neutral")} text="neutral"/>
        <Button handleClick={() => handleClick("bad")} text="bad"/>
      </div>  
      <Heading text="statistics"/>
      {(good + neutral + bad > 0) ? <Statistics good={good} neutral={neutral} bad={bad} /> : <h4>No feedback given</h4>}
    </div>
  )
}

export default App