const db = require("../../db")

const userService = {
  getUserById: async (id) => {
    try {
      const user = await db.user.findUnique({
        where: { id },
      })
      return user
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  getUserByEmail: async (email) => {
    try {
      const user = await db.user.findUnique({
        where: { email: email },
      })
      return user
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  getAll: async () => {
    try {
      return await db.user.findMany()
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  create: async (body) => {
    try {
      const { name, email, gender, meliNumber, password } = body
      const user = await db.user.create({
        data: {
          name,
          gender: gender === "man" ? 0 : 1,
          email,
          meliNumber,
          wallet: 0,
          password,
        },
      })
      return user.id
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  delete: async (id) => {
    try {
      const user = await db.user.delete({
        where: { id: parseInt(id) },
      })
      return user.id
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  update: async (id, body) => {
    try {
      const { gender } = body
      const user = await db.user.update({
        where: { id: parseInt(id) },
        data: { gender: gender },
      })
      return user.id
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },
}

module.exports = userService
