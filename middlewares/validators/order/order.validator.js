const db = require("../../../db")
const { body, check } = require("express-validator")
const { ticketService } = require("../../../modules").ticketApp
const { userService } = require("../../../modules").userApp

const orderValidation = {
  orderValid: [
    body("seat").notEmpty().trim().escape(),
    body("ticketId").notEmpty(),
  ],
  emptySpace: async (req, res, next) => {
    try {
      const { ticketId } = req.body
      const ticket = await ticketService.getTicketById(ticketId)
      if (ticket.quantity > 0) {
        next()
      } else {
        res.json({
          error: true,
          message: "no space!",
        })
      }
    } catch (err) {
      console.log(err.message)
      next(err)
    }
  },

  availableMoney: async (req, res, next) => {
    try {
      const { id } = req.user
      const { ticketId } = req.body
      const user = await userService.getUserById(id)
      const ticket = await ticketService.getTicketById(ticketId)
      if (user.wallet >= ticket.price) {
        next()
      } else {
        res.json({
          error: true,
          message: "you don't have enough money to buy this ticket",
        })
      }
    } catch (err) {
      console.log(err.message)
      next(err)
    }
  },
}

module.exports = orderValidation

// exports.orderValid = [
//   body("seat").notEmpty().trim().escape(),
//   body("ticketId").notEmpty(),
// ]

// exports.emptySpace = async (req, res, next) => {
//   try {
//     const { ticketId } = req.body
//     const ticket = await ticketService.getTicketById(ticketId)
//     if (ticket.quantity > 0) {
//       next()
//     } else {
//       res.json({
//         error: true,
//         message: "no space!",
//       })
//     }
//   } catch (err) {
//     console.log(err.message)
//     next(err)
//   }
// }
