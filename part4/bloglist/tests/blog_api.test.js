const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./blog_api_test_helper')

const Blog = require('../models/blog')

// initialize db with dummy blogs
beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


test('list is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('number of items returned is three', async () => {
  const response = await api.get('/api/blogs/')
  expect(response.body).toHaveLength(3)
})

test('unique identifier is named "id"', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

describe('Adding Blogs to the database', () => {

  test('making an HTTP POST request creates a new blog post', async () => {
    const newBlog = {
      author: 'Joe Shmoe',
      title: 'fake blog',
      url: 'https://testblog.com'
    }
    // Check for correct response from DB
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Check if a new object was added to the database
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    // check if new saved note url exists
    const urlValue = blogsAtEnd.map(blog => blog.url)
    expect(urlValue).toContain('https://testblog.com')
  })

  test('new blogs likes value initialize to zero', async () => {
    const newBlog = {
      author: 'new author',
      title: 'new blog',
      url: 'https://newblog.com'
    }
    // Check for correct response from DB
    const postTest = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(postTest.body.likes).toBe(0)
  })

  test('new post fails if title is missing', async () => {
    const newBlog = {
      author: 'new author',
      url: 'https://newblog.com'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('new post fails if url is missing', async () => {
    const newBlog = {
      author: 'new author',
      title: 'new blog'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

})

describe('Deleting a blog from the database', () => {

  test('succeeds with status code of 204 if id valid', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    // make sure something was deleted
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    // ensure blog to be deleted was the one deleted
    const blogTitles = blogsAtEnd.map(blog => blog.title)
    expect(blogTitles).not.toContain(blogToDelete.title)
  })

})


// Close connection
afterAll(async () => {
  await mongoose.connection.close()
})