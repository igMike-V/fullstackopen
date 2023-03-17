import { useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Custom counter hook
const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase =  () => {
    setValue(value + 1)
  }

  const decrease = ()  => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero
  }

}

// Custom field hook for simple form

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

function App() {
  // Simple counter
  const counter = useCounter()

  // Dual counters
  const leftCounter = useCounter()
  const rightCounter = useCounter()

  // Form Fields
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <section className="simplecounter">
        <h2>Simple counter using custom hook</h2>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>
          plus
        </button>
        <button onClick={counter.decrease}>
          minus
        </button>      
        <button onClick={counter.zero}>
          zero
        </button>
      </section>

      <section className="dualcounter">
        <h2>Dual counter with reusable hook</h2>
        <div className='values'>
          <div className="left">{leftCounter.value}</div>
          <div className="right">{rightCounter.value}</div>
        </div>
        <div className="controls">
          <button onClick={leftCounter.increase}>left</button>
          <button onClick={rightCounter.increase}>right</button>
        </div>
      </section>

      <section className='form'>
        <h2>Controlled form with reusable hooks</h2>
        <form>
        name: 
        <input
          type={name.type}
          value={name.value}
          onChange={name.onChange} 
        /> 
        <br/> 
        birthdate:
        <input {...born} />
        <br /> 
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} | {born.value} | {height.value} 
      </div>
      </section> 

    </div>
  )
}

export default App
