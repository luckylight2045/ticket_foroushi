const orderService = require("./order.service")
const { ticketService } = require("../../modules").ticketApp
require("dotenv").config()

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
      console.log("life is so nice")
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
      const { ticketId, seat } = req.body
      console.log("req.body", req.body)
      const ticket = await ticketService.getTicketById(ticketId)
      const order = await orderService.reserveTicket(
        req.body,
        req.user.id,
        ticket
      )
      console.log(order)
      return res.json({
        access_token: order[2],
      })
    } catch (err) {
      return res.json({
        error: true,
        message: err.message,
      })
    }
  },

  cancelTicket: async (req, res, next) => {
    try {
      let date = new Date()
      date = date.getTime()
      const { id, ticketId } = req.body
      const ticket = await ticketService.getTicketById(ticketId)
      const order = await orderService.getOrderById(id)
      let time = new Date(order.registration_date)
      time = time.setDate(time.getDate())

      if (date < time) {
        await orderService.cancelTicket(id, req.user, ticket, order)
        return res.status(200).end("this ticket is successfully cancelled")
      }
      return res.end("this ticket can not be cancelled anymore")
    } catch (err) {
      return res.json({
        error: true,
        message: err.message,
      })
    }
  },

  checkOrder: async (req, res, next) => {
    try {
      console.log("hello checkorder")
      let date = new Date()
      let newDate = date.getTime()
      const orders = await orderService.getOrders()
      let later, time
      orders.forEach(async (order, index) => {
        time = new Date(order.registration_date)
        later = time.setHours(time.getHours() + 2)
        if (newDate > later && order.status === "reserved") {
          let ticket = await ticketService.getTicketById(order.ticketId)
          await orderService.deleteOrderById(order, ticket)
        }
      })
      next()
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },
}

module.exports = orderController
