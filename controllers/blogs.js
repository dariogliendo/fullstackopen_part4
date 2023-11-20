const blogsRoute = require('express').Router();
const Blog = require('../models/blog');

blogsRoute.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs);
  } catch (error) {
    next(error)
  }
});

blogsRoute.post('/', async (request, response, next) => {
  try {
    if (!request.body.url) return response.status(400).json({ error: 'url missing' })
    if (!request.body.title) return response.status(400).json({ error: 'title missing' })
    const blog = new Blog(request.body);

    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
});

blogsRoute.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRoute.put('/:id', async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRoute;
