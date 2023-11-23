const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res, next) => {
  try {
    const { username, password, name } = req.body;
    if (!password) return res.status(400).json({ error: 'Password is required' })
    if (password.length < 3) return res.status(400).json({ error: 'Password must be at least 3 characters long' })
    

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

userRouter.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    if (error.errors.username) {
      if (error.errors.username.kind === 'minlength') return res.status(400).json({ error: 'Username must be at least 3 characters long' })
      if (error.errors.username.kind === 'required') return res.status(400).json({ error: 'Username is required' })
      if (error.errors.username.kind === 'unique') return res.status(400).json({ error: 'Username must be unique' })
    }
    return res.status(400).json({ error: error.message })
  }
  next(error)
})

module.exports = userRouter
