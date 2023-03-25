const userService = require("./user.service")
const bcrypt = require("bcrypt")
const configs = require("../../configs")
const jwt = require("jsonwebtoken")

const userController = {
  login: async (req, res, next) => {
    try {
      const { password, email } = req.body
      const user = await userService.getUserByEmail(email)
      const validPass = await bcrypt.compare(password, user.password)
      if (!validPass) {
        res.json({
          error: true,
          message: "this password is not valid",
        })
      }
      const token = jwt.sign({ email: email }, configs.SECRET_KEY, {
        expiresIn: configs.EXPIRE_TIME,
      })
      res.json({
        access_token: token,
      })
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },

  get: async (req, res, next) => {
    try {
      const { id } = req.body
      const user = await userService.getUserById(id)
      res.status(200).end(user)
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },

  create: async (req, res, next) => {
    try {
      const { password } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const userId = await userService.create({
        ...req.body,
        password: hashPassword,
      })
      res.end(`user with id: ${userId} is successfully created`)
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },

  getAll: async (req, res, next) => {
    try {
      const users = await userService.getAll()
      res.json(users)
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },

  update: async (req, res, next) => {
    try {
      const { gender } = req.body
      const { id } = req.params
      const userId = await userService.update(id, gender)
      res.end(`user with id:${userId} is successfully updated`)
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params
      const userId = await userService.delete(id)
      res.end(`user with id:${userId} is successfully deleted`)
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },
}

module.exports = userController
