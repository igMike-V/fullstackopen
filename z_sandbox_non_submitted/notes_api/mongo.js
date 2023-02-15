const config = require('./utils/config')
const mongoose = require('mongoose')

/* if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} */

const url = config.TESTDB

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Third Note',
  date: new Date(),
  important: false,
})


note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})