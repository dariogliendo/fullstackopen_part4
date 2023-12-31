const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    const returned = returnedObject;
    returned.id = returnedObject._id.toString()
    delete returned._id;
    delete returned.__v;
  }
})

module.exports = mongoose.model('Blog', blogSchema)