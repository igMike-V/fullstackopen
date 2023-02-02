import React from "react"

const EntryForm = (props) => {
    const {handleNameChange, handleNumberChange, handleSubmit, newName, newNumber} = props
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

export default EntryForm