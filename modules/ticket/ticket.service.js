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

  getAllTickets: async (body) => {
    try {
      const { destination, location } = body
      return await db.ticket.findMany({
        where: {
          AND: [
            {
              location: {
                equals: location,
              },
            },
            {
              destination: {
                equals: destination,
              },
            },
          ],
        },
        select: {
          location: true,
          destination: true,
          price: true,
          quantity: true,
          departure: true,
        },
      })
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  getTicketByLocation: async (location) => {
    try {
      return await db.ticket.findMany({
        where: { location },
      })
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  getTicketByDestination: async (destination) => {
    try {
      return await db.ticket.findMany({
        where: { destination },
      })
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },
}

module.exports = ticketService
