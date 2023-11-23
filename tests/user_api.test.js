const mongoose = require("mongoose")
const User = require("../models/user")
const supertest = require("supertest")
const app = require("../index")
const helper = require("../utils/user_helper")

mongoose.set("bufferTimeoutMS", 60000)

const api = supertest(app)

beforeEach(async () => {
  try {
    await User.deleteMany({})
    for (const user of helper.initialUsers) {
      let userObject = new User(user)
      await userObject.save()
    }
  } catch (error) {
    throw new Error(error)
  }
}, 100000)

describe("User creation", () => {
  test("Can create a user", async () => {
    const newUser = {
      username: "dliendo",
      name: "Dario Liendo",
      password: "password"
    }

    const { body } = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(helper.initialUsers.length + 1)
  })

  test("Cannot create a user with an existing username", async () => {
    const newUser = {
      username: "johndoe",
      name: "John Doe",
      password: "password"
    }

    const { body } = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(helper.initialUsers.length)
    expect(body.error).toBe("Username must be unique")
  })

  test("Cannot create a user without username", async () => {
    const newUser = {
      name: "John Doe",
      password: "password"
    }

    const { body } = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(helper.initialUsers.length)
    expect(body.error).toBe("Username is required")
  })

  test("Cannot create a user with a username shorter than 3 characters", async () => {
    const newUser = {
      username: "jo",
      name: "John Doe",
      password: "password"
    }

    const { body } = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(helper.initialUsers.length)
    expect(body.error).toBe("Username must be at least 3 characters long")
  })

  test("Cannot create a user without password", async () => {
    const newUser = {
      username: "johndoe",
      name: "John Doe"
    }

    const { body } = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(helper.initialUsers.length)
    expect(body.error).toBe("Password is required")
  })

  test("Cannot create a user with a password shorter than 3 characters", async () => {
    const newUser = {
      username: "johndoe",
      name: "John Doe",
      password: "pw"
    }

    const { body } = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(helper.initialUsers.length)
    expect(body.error).toBe("Password must be at least 3 characters long")
  })
})

describe("User listing", () => {
  test("Can list all users", async () => {
    const { body } = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(body).toHaveLength(helper.initialUsers.length)
  })
})

