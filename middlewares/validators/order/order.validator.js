const db = require("../../../db")
const { body, check } = require("express-validator")
const { orderService } = require("../../../modules").orderApp
const { ticketService } = require("../../../modules").ticketApp
const { userService } = require("../../../modules").userApp

const orderValidation = {
  orderValid: [
    body("seat").isArray().notEmpty().trim().escape(),
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
      console.log("available money")
      const { id } = req.user
      const { ticketId } = req.body
      const user = await userService.getUserById(id)
      const ticket = await ticketService.getTicketById(ticketId)
      console.log(req.order)
      console.log(user.wallet, ticket.price, req.order.count)
      if (user.wallet >= ticket.price * req.order.count) {
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

  statusCheck: async (req, res, next) => {
    try {
      console.log("statusCheck")
      if (req.order.status === "reserved") {
        next()
      } else
        return res.json({
          error: true,
          message: "this ticket is paid",
        })
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },

  availableSeat: async (req, res, next) => {
    try {
      const { ticketId, seat } = req.body
      console.log(seat)
      const orders = await orderService.getOrderByTicketId(ticketId)
      let check = false
      orders.forEach((item) => {
        item.seat.forEach((chair) => {
          if (seat.includes(chair)) {
            check = true
          }
        })
      })
      if (!check) {
        console.log(seat)
        next()
      } else {
        return res.json({
          error: true,
          message: "this seat has already been reserved",
        })
      }
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },
}

module.exports = orderValidation
