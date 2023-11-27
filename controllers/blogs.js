const blogsRoute = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRoute.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRoute.post('/', middleware.userExctractor, async (request, response, next) => {
  try {
    if (!request.body.title) return response.status(400).json({ error: 'title missing' });
    if (!request.body.url) return response.status(400).json({ error: 'url missing' });
    const authorUser = request.user
    const blog = new Blog(request.body);

    blog.user = authorUser._id;

    const result = await blog.save();
    if (!authorUser.blogs) authorUser.blogs = []
    authorUser.blogs = [...authorUser.blogs, result._id];
    await authorUser.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRoute.delete('/:id', middleware.userExctractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) return response.status(404).json({ error: 'blog not found' });
    if (!blog.user.equals(request.user._id)) return response.status(401).json({ error: 'Unauthorized' });
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRoute.put('/:id', async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRoute;
