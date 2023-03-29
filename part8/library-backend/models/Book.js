const { model, Schema } = require('mongoose')

// you must install this library
const uniqueValidator = require('mongoose-unique-validator')

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: {
    type: Number,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

schema.plugin(uniqueValidator)

module.exports = model('Book', schema)