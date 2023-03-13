import { useMutation } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = ({ queryClient }) => {
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data, returnedAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({ type: 'SET', payload: `anecdote '${returnedAnecdote.content}' created` })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = {
      content,
      id: getId(),
      votes: 0,
    }
    newAnecdoteMutation.mutate(newAnecdote)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
