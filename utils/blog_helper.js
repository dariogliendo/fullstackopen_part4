const supertest = require('supertest')
const app = require('../index')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Django",
    url: "http://www.google.com",
    likes: 0,
  },
  {
    title: "My name is Hola",
    author: "James",
    url: "http://www.google.com",
    likes: 0,
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDB
}