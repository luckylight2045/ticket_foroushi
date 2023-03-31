const db = require("../../db")

const userService = {
  getUserById: async function (id) {
    try {
      const user = await db.user.findUnique({
        where: { id },
        select: {
          name: true,
          email: true,
          wallet: true,
          gender: true,
          meliNumber: true,
          phone: true,
          registration_date: true,
        },
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
      return await db.user.findMany({
        select: {
          phone: true,
          email: true,
          name: true,
          wallet: true,
          gender: true,
          meliNumber: true,
        },
      })
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  create: async (body) => {
    try {
      const today = new Date()
      const { name, email, gender, meliNumber, password, phone, birthday } =
        body
      const user = await db.user.create({
        data: {
          name,
          gender: gender === "male" ? 0 : 1,
          email,
          meliNumber,
          wallet: 0,
          password,
          phone,
          birthday: birthday !== null ? birthday : null,
          registration_date: new Date(
            today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate()
          ),
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
      const { birthday, gender, phone } = body
      console.log(birthday, gender, phone)
      const user = await db.user.update({
        where: { id: parseInt(id) },
        data: {
          gender: gender && gender === "male" ? 0 : 1,
          phone: phone && phone,
          birthday: birthday && birthday,
        },
      })
      console.log(user)
      return user.id
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  addToWallet: async (user, money) => {
    try {
      const newUser = await db.user.update({
        where: { id: parseInt(user.id) },
        data: { wallet: user.wallet + money },
      })
      return newUser.id
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },
}

module.exports = userService
