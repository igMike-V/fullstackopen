import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from './reducer'

import { createStore } from 'redux'

const store = createStore(counterReducer)

const clickHandler = action => {
  store.dispatch({ type: action })
}

const Button = ({ action, clickHandler, label })=> {
  return (
    <button className='button' id={`button-${action.toLowerCase()}`} onClick={() => clickHandler(action.toUpperCase())}>
      {label}
    </button>
  )
}


const App = () => {
  return (
    <div className='App'>
      <div className="controls">
        <Button action='good' label='good' clickHandler={clickHandler} />
        <Button action='ok' label='ok' clickHandler={clickHandler} />
        <Button action='bad' label='bad' clickHandler={clickHandler} />
        <Button action='zero' label='reset stats' clickHandler={clickHandler} />
      </div>
      <div className="info">
        <p className="info-good"> good {store.getState().good} </p>
        <p className="info-good"> ok {store.getState().ok} </p>
        <p className="info-good"> bad {store.getState().bad} </p>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
  root.render(<App />)
}
renderApp()
store.subscribe(renderApp)