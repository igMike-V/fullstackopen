const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')


// Get all posts
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

// Add a new post
blogsRouter.post('/', async (req, res) => {
  const body = req.body
  if (!body.title || !body.author || !body.url) {
    res.status(400).end()
  } else if(!(req.get('authorization'))){
    res.status(401).json({ error: 'Unauthorized' })
  } else {
    // Get user from authenticated token
    const user = req.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  }
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', { username: 1, name: 1 })
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(!blog){
    return res.status(404).json({ error: 'invalid id' })
  }
  // check if user can delete by matching user id to user
  const authToken = jwt.verify(req.token, process.env.SECRET)
  if (!authToken.id) {
    return res.status(404).json({ error: 'invalid token' })
  } else if (!(authToken.id.toString() === blog.user.toString())){
    return res.status(403).json({ error: 'unauthorized' })
  }
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

// Add like
blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    likes: body.likes,
    title: body.title,
    author: body.author,
    url: body.url,
    user: body.user
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog)

})

module.exports = blogsRouter