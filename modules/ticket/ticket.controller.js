const ticketService = require("./ticket.service")

const ticketController = {
  getTicketById: async (req, res) => {
    try {
      const { userId } = req.body
      const ticket = await ticketService.getTicketById(userId)
      return res.end(ticket)
    } catch (err) {
      return res.json({
        error: true,
        message: err.message,
      })
    }
  },

  getAllTickets: async (req, res) => {
    try {
      const tickets = await ticketService.getAllTickets(req.body)
      if (tickets.length > 0) {
        return res.json(tickets)
      }
      return res.json({
        error: true,
        message: "there is no ticket with this route",
      })
    } catch (err) {
      return res.json({
        error: true,
        message: err.message,
      })
    }
  },
}

module.exports = ticketController
