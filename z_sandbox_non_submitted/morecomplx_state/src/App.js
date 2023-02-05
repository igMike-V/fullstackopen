import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

//define History component to store and update click log
const History = (props) => {
  if(props.allClicks.length === 0){
    return(
    <div>
      The app is used by pressing the buttons
    </div>
    )
  } 
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

//define Button component
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Buttons = (props) => (
  <button onClick={props.doClick}>{props.text}</button>
)

const Display = props => <div>{props.value}</div>


const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }
  const hello = (who) => () =>{
      console.log('Hello', who) 
  }
  
  const [value, setValue] = useState(10)

  const setToValue = (newValue) =>  {
    setValue(newValue)
  }

  
    return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />

    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='Right' />
      {right}
      {console.log(allClicks)}
      <History allClicks={allClicks} />

      <button onClick={hello('react')}> button</button>
      <button onClick={hello('function')}> button</button>
      <div>
      <Display value={value} />
      <Buttons doClick={() => setToValue(1000)} text="thousand" />
      <Buttons doClick={() => setToValue(0)} text="reset" />
      <Buttons doClick={() => setToValue(value + 1)} text="increment" />
      </div>
    </div>
    </div>
  );
}

export default App;
