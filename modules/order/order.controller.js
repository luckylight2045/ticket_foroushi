const orderService = require("./order.service")
const { ticketService } = require("../../modules").ticketApp
const jwt = require("jsonwebtoken")
require("dotenv").config()
const configs = require("../../configs")

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const { id } = req.user
      const orders = await orderService.getAllOrders(id)
      res.json(orders)
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },

  makeOrder: async (req, res) => {
    try {
      const { ticketId } = req.body
      const ticket = await ticketService.getTicketById(ticketId)
      await orderService.makeOrder(req.body, req.user, ticket, req.order)
      res.end("order is successfully met")
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },

  reserveTicket: async (req, res, next) => {
    try {
      console.log("hello everyone")
      const { ticketId } = req.body
      const ticket = await ticketService.getTicketById(ticketId)
      const order = await orderService.reserveTicket(
        req.body,
        req.user.id,
        ticket
      )
      const token = jwt.sign(ticket, "fijaihohief35985fa", {
        expiresIn: "2h",
      })
      console.log(order)
      return res.json({
        access_token: token,
      })
    } catch (err) {
      return res.json({
        error: true,
        message: err.message,
      })
    }
  },
}

module.exports = orderController
