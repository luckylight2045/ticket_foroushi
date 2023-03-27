const orderService = require("./order.service")
const { ticketService } = require("../../modules").ticketApp

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
      await orderService.makeOrder(req.body, req.user, ticket)
      res.end("order is successfully met")
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },
}

module.exports = orderController
