const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  if (password.length < 3){
    res.status(400).json({ error: 'Error, invalid password. Passwords must be longer then 2 characters long' })
  }
  if (username.length < 3){
    res.status(400).json({ error: `Error, ${username} is an invalid username. Usernames must be longer then 2 characters long` })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name,
    username,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1
  })
  res.json(users)
})

module.exports = usersRouter