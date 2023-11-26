const mongoose = require('mongoose');
const User = require('../models/user');
const supertest = require('supertest');
const app = require("../index")
const bcrypt = require("bcrypt")

const api = supertest(app);

beforeEach(async () => {
  try {
    await User.deleteMany({});
    const user = new User({
      username: "testuser",
      name: "Test User",
      passwordHash: bcrypt.hashSync("pwdsecreta", 10)
    })

    await user.save()
  } catch (error) {
    throw new Error(error);
  }
})

describe("Can use the login endpoint", () => {
  test("User can login", async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: "testuser",
        password: "pwdsecreta"
      })
      .expect(200)

      expect(response.body.token).toBeDefined()
      expect(response.body.username).toBe("testuser")
    expect(response.body.name).toBe("Test User")
  })
})

