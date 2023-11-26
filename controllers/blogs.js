const blogsRoute = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRoute.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRoute.post('/', async (request, response, next) => {
  try {
    if (!request.body.title) return response.status(400).json({ error: 'title missing' });
    if (!request.body.url) return response.status(400).json({ error: 'url missing' });
    const users = await User.find({});
    const blog = new Blog(request.body);
    const authorUser = users[Math.floor(Math.random() * users.length)];

    blog.user = authorUser._id;

    const result = await blog.save();
    authorUser.blogs = [...authorUser.blogs, result._id];
    await authorUser.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRoute.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
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
