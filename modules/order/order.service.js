const { order } = require("../../db")
const db = require("../../db")
const jwt = require("jsonwebtoken")

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

  getOrders: async () => {
    try {
      return await db.order.findMany()
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  reserveTicket: async (body, id, ticket) => {
    try {
      const today = new Date()
      const { seat, ticketId } = body
      console.log(seat)
      const [newOrder, newTicket] = await db.$transaction([
        db.order.create({
          data: {
            status: "reserved",
            seat,
            total_price: ticket.price * seat.length,
            ticketId,
            userId: id,
            count: seat.length,
            registration_date: new Date(
              today.getFullYear() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getDate() +
                " " +
                today.getHours() +
                ":" +
                today.getMinutes() +
                ":" +
                today.getSeconds()
            ),
          },
        }),

        db.ticket.update({
          where: { id: parseInt(ticketId) },
          data: { quantity: ticket.quantity - seat.length },
        }),
      ])
      const token = jwt.sign(
        {
          id: newOrder.id,
          ticketId,
          count: seat.length,
          seat,
          status: "reserved",
        },
        "fijaihohief35985fa",
        {
          expiresIn: "2h",
        }
      )
      return [newOrder, newTicket, token]
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  makeOrder: async (body, user, ticket, order) => {
    try {
      const { ticketId } = body
      const [newOrder, newUser] = await db.$transaction([
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
      ])
      return [newOrder, newUser]
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  getOrderByTicketId: async (ticketId) => {
    try {
      return await db.order.findMany({
        where: {
          AND: [
            {
              ticketId: {
                equals: ticketId,
              },
            },
            {
              status: {
                equals: "paid",
              },
            },
          ],
        },
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
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  deleteOrderById: async (order, ticket) => {
    try {
      const [newOrder, newTicket] = await db.$transaction([
        db.order.delete({
          where: { id: order.id },
        }),

        db.ticket.update({
          where: { id: ticket.id },
          data: {
            quantity: ticket.quantity + order.count,
          },
        }),
      ])
      return [newOrder, newTicket]
    } catch (err) {
      console.log(err.message)
      throw new Error(err.message)
    }
  },

  cancelTicket: async (id, user, ticket, order) => {
    try {
      const [newOrder, newUser, newTicket] = await db.$transaction([
        db.order.update({
          where: { id },
          data: {
            status: "cancelled",
          },
        }),
        db.user.update({
          where: { id: user.id },
          data: {
            wallet: user.wallet + order.total_price,
          },
        }),

        db.ticket.update({
          where: { id: ticket.id },
          data: {
            quantity: ticket.quantity + order.count,
          },
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
