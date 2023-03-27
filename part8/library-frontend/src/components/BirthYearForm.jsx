import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BORN, ALL_AUTHORS } from '../queries'



const BirthYearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBorn, result] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.error(error)
  })
  const submit = async (event) => {
    event.preventDefault()
    changeBorn({ variables: { setBornTo: parseInt(born), name } })
    setBorn('')
    setName('')
  }

  return (
      <div>
        <h2> Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
        </form>
      </div>
    )
  }

export default BirthYearForm