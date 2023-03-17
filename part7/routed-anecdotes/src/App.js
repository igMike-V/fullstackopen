import { useState } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import './app.css'
import { useField } from './hooks'



const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div className='menu'>
      <Link style={padding} to="/">Anecdotes</Link>
      <Link style={padding} to="/create">Create New</Link>
      <Link style={padding} to="/about">About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div className='anecdote-list'>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div className='about'>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <footer className='footer'>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </footer>
)

// Custom component to remove reset attribute from field
const InputField = ({ reset, ...rest }) => {
  return (
    <input {...rest} />
  )
}

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }
  
  const handleReset = (e) => {
    e.preventDefault()
    const fields = [
      content,
      author,
      info
    ]

    fields.forEach(field => field.reset())
  }
  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div className='input-container'>
          <span>content</span>
          <InputField { ...content } />
        </div>
        <div className='input-container'>
          <span>author</span>
          <InputField {...author} />
        </div>
        <div className='input-container'>
          <span>url for more info</span>
          <InputField {...info} />
        </div >
        <button onClick={(event) => handleSubmit(event)}>create</button>
        <button onClick={(event) => handleReset(event)}>reset</button>
      </form>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const {content, author, info, votes } = anecdotes.find(a => a.id === +id)
  return (
    <section className="ancedote-single" >
      <h1>{content} by {author}</h1>
      <p>has {votes} votes</p>
      <p>for more info see <Link to={info} >{info}</Link></p>
      <Link to="/" >&larr; Back</Link>
    </section>
  )
}

const App = () => {
  const navigate = useNavigate()
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new ancdote ${anecdote.content} created!`)
    navigate('/')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const Notification = ({ notification }) => {
    if(notification) {
      return (
        <div className='notificaiton' >
          {notification}
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div className='App'>
      <main>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification} />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} /> } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
