import React from 'react'
import ReactDom from 'react-dom/client'
import counterReducer from './reducer'

import { createStore } from 'redux'

const store = createStore(counterReducer)

console.log(store.getState())

