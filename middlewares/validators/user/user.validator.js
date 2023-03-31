const { body, check } = require("express-validator")
const db = require("../../../db")
const { userService } = require("../../../modules").userApp

exports.createUser = [
  // name, email, gender, meliNumber
  body("name").notEmpty().trim().escape(),
  body("gender").isString().notEmpty().trim().escape(),
  body("phone").isString().notEmpty().trim().escape(),
  body("email")
    .notEmpty()
    .trim()
    .escape()
    .custom(async (val) => {
      try {
        const user = await db.user.findUnique({
          where: { email: val },
        })

        if (!user) {
          return Promise.resolve(val)
        }
        return Promise.reject(`user with email:${val} has already been existed`)
      } catch (err) {
        console.log(err.message)
        throw new Error(err.message)
      }
    }),
  body("meliNumber")
    .notEmpty()
    .trim()
    .escape()
    .custom(async (val) => {
      try {
        const user = await db.user.findUnique({
          where: { meliNumber: val },
        })
        if (!user) {
          return Promise.resolve(val)
        }
        return Promise.reject(`user with email:${val} has already been existed`)
      } catch (err) {
        console.log(err.message)
        throw new Error(err.message)
      }
    }),
  body("password").notEmpty().trim().escape(),
]

exports.loginUser = [
  body("email")
    .notEmpty()
    .trim()
    .escape()
    .custom(async (val) => {
      try {
        const user = await userService.getUserByEmail(val)
        if (!user) {
          return Promise.reject(`there is no user with this email`)
        }
        return Promise.resolve(val)
      } catch (err) {
        console.log(err.message)
        throw new Error(err.message)
      }
    }),
  body("password").notEmpty().trim().escape(),
]

exports.addMoney = [body("money").notEmpty().isInt()]
