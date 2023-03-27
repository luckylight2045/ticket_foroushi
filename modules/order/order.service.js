const { order } = require("../../db")
const db = require("../../db")

const orderService = {
  getAllOrders: async (id) => {
    try {
      return await db.order.findMany({
        where: { userId: parseInt(id) },
        select: {
          seat: true,
          userId: true,
          Ticket: {
            select: {
              location: true,
              destination: true,
              price: true,
              departure: true,
            },
          },
        },
      })
    } catch (err) {
      console.log(err.message)
      throw new Error(err.messaeg)
    }
  },

  makeOrder: async (body, user, ticket) => {
    try {
      const { ticketId, seat } = body
      const [newOrder, newUser, newTicket] = await db.$transaction([
        db.order.create({
          data: {
            ticketId: parseInt(ticketId),
            seat,
            userId: parseInt(user.id),
          },
        }),

        db.user.update({
          where: { id: parseInt(user.id) },
          data: { wallet: user.wallet - ticket.price },
        }),

        db.ticket.update({
          where: { id: parseInt(ticketId) },
          data: { quantity: ticket.quantity - 1 },
        }),
      ])
      return [newOrder, newUser, newTicket]
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },
}

module.exports = orderService
