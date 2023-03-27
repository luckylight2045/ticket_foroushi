const db = require("../../db")

const ticketService = {
  getTicketById: async (id) => {
    try {
      const ticket = await db.ticket.findUnique({
        where: { id: parseInt(id) },
      })
      return ticket
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },
}

module.exports = ticketService
