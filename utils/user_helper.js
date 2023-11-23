const bcrypt = require('bcrypt')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'johndoe',
    name: 'John Doe',
    passwordHash: bcrypt.hashSync('secret', 10),
  },
  {
    username: 'janedoe',
    name: 'Jane Doe',
    passwordHash: bcrypt.hashSync('anothersecret', 10),
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers,
  usersInDb
}

