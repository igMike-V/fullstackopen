const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const usersInDB = require('./user_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'test', passwordHash })

    await user.save()
  })

  test('creation fails with statuscode when user with existing username is created', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'test',
      name: 'New User',
      password: 'pass'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await usersInDB()
    expect(usersAtEnd).toEqual(usersAtStart)

  })

  test('username must be at least 3 characters', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'te',
      name: 'New User',
      password: 'pass'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Usernames must be longer then 2 characters')

    const usersAtEnd = await usersInDB()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('password must be at least 3 characters', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'tests',
      name: 'New User',
      password: 'pa'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Error, invalid password. Passwords must')

    const usersAtEnd = await usersInDB()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})