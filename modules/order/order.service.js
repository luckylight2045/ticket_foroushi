const { order } = require("../../db")
const db = require("../../db")

const orderService = {
  getAllOrders: async (id) => {
    try {
      return await db.order.findMany({
        where: { userId: parseInt(id) },
        select: {
          seat: true,
          count: true,
          status: true,
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

  reserveTicket: async (body, id, ticket) => {
    try {
      const today = new Date()
      const { seat, ticketId } = body
      console.log(seat)
      const order = await db.order.create({
        data: {
          status: "reserved",
          seat: {
            set: true,
          },
          total_price: ticket.price * seat.length,
          ticketId,
          userId: id,
          count: seat.length,
          registration_date: new Date(
            today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate()
          ),
        },
      })
      return order
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  makeOrder: async (body, user, ticket, order) => {
    try {
      const { ticketId } = body
      const [newOrder, newUser, newTicket] = await db.$transaction([
        db.order.update({
          where: { id: order.id },
          data: {
            status: "paid",
          },
        }),

        db.user.update({
          where: { id: parseInt(user.id) },
          data: { wallet: user.wallet - ticket.price * order.count },
        }),

        db.ticket.update({
          where: { id: parseInt(ticketId) },
          data: { quantity: ticket.quantity - order.count },
        }),
      ])
      return [newOrder, newUser, newTicket]
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  getOrderByTicketId: async (ticketId) => {
    try {
      return await db.order.findMany({
        where: { ticketId },
      })
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  getOrderById: async (id) => {
    try {
      return await db.order.findUnique({
        where: { id },
      })
    } catch (err) {
      console.log(er.message)
      throw new Error(err.message)
    }
  },
}

module.exports = orderService
