const ticketService = require("./ticket.service")

const ticketController = {
  getTicketById: async (req, res) => {
    try {
      const { userId } = req.body
      const ticket = await ticketService.getTicketById(userId)
      return res.end(ticket)
    } catch (err) {
      res.json({
        error: true,
        message: err.message,
      })
    }
  },
}

module.exports = ticketController
