// eslint-disable-next-line no-unused-vars
import React from 'react'

const PersonForm = (props) => {
  const { handleNameChange, handleNumberChange, handleSubmit, newName, newNumber } = props
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button onClick={handleSubmit} type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm