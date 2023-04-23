const userService = require("./user.service")
const bcrypt = require("bcrypt")
const configs = require("../../configs")
const jwt = require("jsonwebtoken")

const userController = {
  login: async (req, res, next) => {
    try {
      const { password, email } = req.body
      const user = await userService.getUserByEmail(email)
      if (!user) {
        res.json({
          error: true,
          message: "this user doesn't exist",
        })
      }
      const validPass = await bcrypt.compare(password, user.password)
      if (!validPass) {
        res.json({
          error: true,
          message: "this password is not valid",
        })
      }
      const token = jwt.sign({ email: user.email }, configs.SECRET_KEY, {
        expiresIn: configs.EXPIRE_TIME,
      })

      const newRefreshToken = jwt.sign(
        { email: user.email },
        configs.SECRET_KEY,
        {
          expiresIn: "7d",
        }
      )

      const refreshToken = await userService.addRefreshToken(
        newRefreshToken,
        user
      )
      return res.json({
        access_token: token,
        refresh_token: newRefreshToken,
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
      const { id } = req.user
      const user = await userService.getUserById(id)
      return res.status(200).json(user)
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
      const { id } = req.user
      const userId = await userService.update(id, req.body)
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
      const { id } = req.user
      const userId = await userService.delete(id)
      res.end(`user with id:${userId} is successfully deleted`)
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },

  addToWallet: async (req, res, next) => {
    try {
      const { money } = req.body
      const { id } = req.user
      const userId = await userService.addToWallet(req.user, money)
      res.status(200).end(`user with id:${userId} is successfully updated`)
    } catch (err) {
      res.json({
        error: true,
        messaeg: err.message,
      })
    }
  },

  getUserInfo: async (req, res) => {
    try {
      const { id } = req.user
      const userInfo = await userService.getUserById(id)
      return res.json(userInfo)
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },

  getAllOrders: async (req, res, next) => {
    try {
      const { id } = req.user
      const allOrders = await userService.getAllOrders(id)
      return res.json(allOrders)
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },

  logout: async (req, res) => {
    try {
      const { email } = req.body
      const user = await userService.getUserByEmail(email)

      if (!user) {
        return res.json({
          error: true,
          message: "this user doesn't exist",
        })
      }
      await userService.deletRefreshToken(user.id)
      return res.end("refresh token is deleted")
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },
}

module.exports = userController
