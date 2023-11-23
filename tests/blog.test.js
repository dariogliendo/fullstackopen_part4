const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../index.js')
const helper = require('../utils/blog_helper')

mongoose.set("bufferTimeoutMS", 60000)

const api = supertest(app)

beforeEach(async () => {
  try {
    await Blog.deleteMany({})
    for (const blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }

  } catch (error) {
    throw error
  }
})

describe("GET method", () => {
  test('blogs are returned as json', async () => {
    api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('document identifier is "id"', async () => {
    const { body } = await api.get('/api/blogs')
    expect(body[0].id).toBeDefined()
  })
})

describe("POST Method", () => {
  test('a new blog is added', async () => {
    const newBlog = {
      title: "My name is Juan",
      author: "Juan Gomez",
      url: "http://www.google.com",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDB()

    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
  }, 10000)

  test('if no likes are provided, defaults to 0', async () => {
    const newBlog = {
      title: "My name is Juan",
      author: "Juan Gomez",
      url: "http://www.google.com"
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    expect(result.body.likes).toBe(0)
  })

  test('responds status 400 to missing url property', async () => {
    const newBlog = {
      title: "My name is Juan",
      author: "Juan Gomez",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await helper.blogsInDB()

    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
  })

  test('responds status 400 to missing title property', async () => {
    const newBlog = {
      author: "Juan Gomez",
      url: "http://www.google.com",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await helper.blogsInDB()

    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
  })
})

describe("DELETE Method", () => {
  test('a blog can be deleted', async () => {
    const inDb = await helper.blogsInDB()
    const blogToDelete = inDb[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const inDbAfter = await helper.blogsInDB()
    expect(inDbAfter).toHaveLength(inDb.length - 1)
  })
})

describe("PUT Method", () => {
  test('a blog can be updated', async () => {
    const inDb = await helper.blogsInDB()
    const blogToUpdate = inDb[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toBe(updatedBlog.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})