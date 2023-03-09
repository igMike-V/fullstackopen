import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().match(state.filter.toLowerCase()))
  
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(updateVote(id))
    const voteTarget = anecdotes.find(anecdote => anecdote.id === id).content
    dispatch(setNotification(`You voted: '${voteTarget}'`))
    setTimeout(()=>{
      dispatch(removeNotification())
    },5000)
  }

  return (

    <div className="anecdote-list">
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList