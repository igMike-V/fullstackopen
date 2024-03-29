const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./blog_api_test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
// userToken gets set in the beforeEach Function
let userToken = ''
// initialize db with dummy blogs
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  // Create a user
  const newUser = {
    username: 'testuser',
    password: 'password'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  // Login new user to get token

  const loginResponse = await api
    .post('/api/login')
    .send(newUser)

  userToken = loginResponse.body.token

  for (let blog of helper.initialBlogs) {
    await api
      .post('/api/blogs')
      .set('authorization', 'Bearer ' + userToken)
      .send(blog)
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
    // Create a user

    const newBlog = {
      author: 'Joe Shmoe',
      title: 'fake blog',
      url: 'https://testblog.com'
    }
    // Check for correct response from DB
    await api
      .post('/api/blogs')
      .set('authorization', 'Bearer ' + userToken)
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

  test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
    // Create a user
    const newBlog = {
      author: 'Joe Shmoe',
      title: 'fake blog',
      url: 'https://testblog.com'
    }
    // Check for correct response from DB
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    // Make sure no blog was added to the database
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
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
      .set('authorization', 'Bearer ' + userToken)
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
      .set('authorization', 'Bearer ' + userToken)
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
      .set('authorization', 'Bearer ' + userToken)
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
      .set('authorization', 'Bearer ' + userToken)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    //make sure something was deleted
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    // ensure blog to be deleted was the one deleted
    const blogTitles = blogsAtEnd.map(blog => blog.title)
    expect(blogTitles).not.toContain(blogToDelete.title)
  })

})

describe('updating blog', () => {
  test('adds a like', async () => {
    const TEST_INDEX = 1
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[TEST_INDEX]
    const updatedLikes = blogToUpdate.likes + 1
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: updatedLikes })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd[TEST_INDEX].likes).toBe(blogToUpdate.likes + 1)
    console.log(blogsAtEnd)
  })
})

// Close connection
afterAll(async () => {
  await mongoose.connection.close()
})