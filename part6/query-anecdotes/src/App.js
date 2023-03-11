import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, updateVote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const voteMutuation = useMutation(updateVote, {
    onSuccess: (data, updatedAnecdote) => {
      const anecdotes = queryClient
        .getQueryData('anecdotes')
        .map(anecdote => {
          if(anecdote.id === updatedAnecdote.id) {
            return updatedAnecdote
          }
          return anecdote
        }
      )
      queryClient.setQueryData('anecdotes', anecdotes)
    }
  })
 
  const handleVote = (anecdote) => {
    voteMutuation.mutate({ ...anecdote, votes: +anecdote.votes + 1 })
  }

  const result = useQuery('anecdotes', getAnecdotes,
    {
      retry: 2
    }
  )

  if (result.isError) {
    return <div>anecdote service not available due to problems on server</div>
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm queryClient={queryClient} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
