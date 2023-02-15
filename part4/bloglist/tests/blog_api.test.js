const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

//const Blog = require('../models/blog')

test('list is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('number of items returned is one', async () => {
  const response = await api.get('/api/blogs/')
  expect(response.body).toHaveLength(1)
})

test.only('unique identifier is named "id"', async () => {
  const response = await api.get('/api/blogs/63eceac08eeb3238ec5c36c8')
  expect(response.body.id).toBeDefined()
})


afterAll(async () => {
  await mongoose.connection.close()
})